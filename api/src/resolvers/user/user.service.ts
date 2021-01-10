import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from '../../services/password.service';
import { PrismaService } from '../../services/prisma.service';
import { ChangePasswordInput, UpdateUserInput } from './user.inputs';

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
}
