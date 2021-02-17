import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordService } from '../../services/password.service';
import { PrismaService } from '../../services/prisma.service';
import {
  ChangePasswordInput,
  ChangeUserRoleInput,
  DeleteUserInput,
  ReadNotificationInput,
  ToggleNotificationSettingsInput,
  UpdateUserInput,
  UserOrder,
} from './user.inputs';
import { Role, User, UserSettings } from './user.model';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: {
        username: newUserData.username,
        avatarUrl: newUserData.avatarUrl,
        email: newUserData.email,
        playgroundSettings: {
          update: newUserData.playgroundSettings,
        },
      },
      where: {
        id: userId,
      },
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }

  async toggleNotificationSettings(
    userId: string,
    input: ToggleNotificationSettingsInput
  ) {
    return this.prisma.user.update({
      data: {
        userSettings: {
          update: {
            notificationEnabled: input.notificationEnabled,
            notificationRecommended: input.notificationRecommended,
            notificationAdminReview: input.notificationAdminReview,
          },
        },
      },
      where: {
        id: userId,
      },
    });
  }

  async changeUserRole(user: User, input: ChangeUserRoleInput) {
    if (user.role !== Role.ADMIN) {
      throw new Error('Unauthorized.');
    }
    return this.prisma.user.update({
      data: {
        role: input.role,
      },
      where: {
        id: input.userId,
      },
    });
  }

  async deleteUser(user: User, input: DeleteUserInput) {
    if (user.role !== Role.ADMIN) {
      throw new Error('Unauthorized.');
    }

    const playgroundSettings = await this.prisma.user
      .findUnique({
        where: {
          id: input.userId,
        },
      })
      .playgroundSettings();

    const userSettings = await this.prisma.user
      .findUnique({
        where: {
          id: input.userId,
        },
      })
      .userSettings();

    this.prisma.playgroundSettings.delete({
      where: {
        id: playgroundSettings.id,
      },
    });

    this.prisma.userSettings.delete({
      where: {
        id: userSettings.id,
      },
    });

    return this.prisma.user.delete({
      where: {
        id: input.userId,
      },
    });
  }

  async userSettings(userId: string): Promise<UserSettings> {
    return this.prisma.user
      .findUnique({ where: { id: userId } })
      .userSettings();
  }

  async user({ userId }: { userId: string }, user: User) {
    if (user.role !== Role.ADMIN) {
      throw new Error('Unauthorized.');
    }
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async users(
    {
      paginationArgs,
      query,
      orderBy,
    }: {
      paginationArgs: PaginationArgs;
      query?: string;
      orderBy?: UserOrder;
    },
    user: User
  ) {
    if (user.role !== Role.ADMIN) {
      throw new Error('Unauthorized.');
    }
    return findManyCursorConnection(
      (args) =>
        this.prisma.user.findMany({
          where: {
            OR: [
              { username: { contains: query || '' } },
              { email: { contains: query || '' } },
            ],
          },
          ...(orderBy && { orderBy: { [orderBy.field]: orderBy.direction } }),
          ...args,
        }),
      () =>
        this.prisma.user.count({
          where: {
            OR: [
              { username: { contains: query || '' } },
              { email: { contains: query || '' } },
            ],
          },
        }),
      {
        first: paginationArgs.first,
        last: paginationArgs.last,
        before: paginationArgs.before,
        after: paginationArgs.after,
      }
    );
  }

  async playgroundSettings(userId: string) {
    return this.prisma.user
      .findUnique({ where: { id: userId } })
      .playgroundSettings();
  }

  async notifications(userId: string) {
    return this.prisma.user
      .findUnique({ where: { id: userId } })
      .notifications({
        where: { read: false },
        orderBy: { createdAt: 'desc' },
      });
  }

  async readNotification(userId: string, input: ReadNotificationInput) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: input.notificationId },
    });
    if (notification.userId !== userId) {
      throw new Error('Unauthorized.');
    }
    return this.prisma.notification.update({
      data: { read: true },
      where: { id: input.notificationId },
    });
  }

  async createNotification({
    userId,
    message,
  }: {
    userId: string;
    message: string;
  }) {
    const userSettings = await this.prisma.userSettings.findFirst({
      where: { userId },
    });

    if (userSettings.notificationEnabled)
      return this.prisma.notification.create({
        data: { message, for: { connect: { id: userId } } },
      });
    else return false;
  }

  async createAdminNotification({ message }: { message: string }) {
    const admins = await this.prisma.user.findMany({
      where: {
        role: 'ADMIN',
      },
      include: {
        userSettings: true,
      },
    });

    admins.map((admin) => {
      if (admin.userSettings.notificationAdminReview) {
        this.createNotification({ userId: admin.id, message });
      }
    });

    return true;
  }
}
