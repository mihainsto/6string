import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from '../../services/password.service';
import { PrismaService } from '../../services/prisma.service';
import {
  ChangePasswordInput,
  ToggleNotificationSettingsInput,
  UpdateUserInput,
} from './user.inputs';
import { PlaygroundSettings, User, UserSettings } from './user.model';

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

  toggleNotificationSettings(
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

  async userSettings(userId: string): Promise<UserSettings> {
    return this.prisma.user
      .findUnique({ where: { id: userId } })
      .userSettings();
  }

  async playgroundSettings(userId: string): Promise<PlaygroundSettings> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.prisma.user
      .findUnique({ where: { id: userId } })
      .playgroundSettings();
  }
}
