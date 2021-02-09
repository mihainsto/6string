import { PrismaService } from './../../services/prisma.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from './user.model';
import { UserService } from 'src/resolvers/user/user.service';
import {
  ChangePasswordInput,
  UpdatePlaygroundSettingsInput,
  UpdateUserAvatarInput,
  UpdateUserEmailInput,
  UpdateUserInput,
  UpdateUserNameInput,
} from './user.inputs';

@Resolver((of) => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
    private prisma: PrismaService
  ) {}

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.userService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUserName(
    @UserEntity() user: User,
    @Args('input') input: UpdateUserNameInput
  ) {
    return this.userService.updateUser(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUserEmail(
    @UserEntity() user: User,
    @Args('input') input: UpdateUserEmailInput
  ) {
    return this.userService.updateUser(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUserAvatar(
    @UserEntity() user: User,
    @Args('input') input: UpdateUserAvatarInput
  ) {
    return this.userService.updateUser(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updatePlaygroundSettings(
    @UserEntity() user: User,
    @Args('input') input: UpdatePlaygroundSettingsInput
  ) {
    return this.userService.updateUser(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('input') changePassword: ChangePasswordInput
  ) {
    return this.userService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }

  @ResolveField('playgroundSettings')
  playgroundSettings(@Parent() user: User) {
    return this.prisma.user
      .findUnique({ where: { id: user.id } })
      .playgroundSettings();
  }
}
