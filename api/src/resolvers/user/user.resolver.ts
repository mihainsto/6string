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
import {
  PlaygroundSettings,
  User,
  UserConnection,
  UserSettings,
} from './user.model';
import { UserService } from 'src/resolvers/user/user.service';
import {
  ChangePasswordInput,
  ChangeUserRoleInput,
  DeleteUserInput,
  ToggleNotificationSettingsInput,
  UpdatePlaygroundSettingsInput,
  UpdateUserAvatarInput,
  UpdateUserEmailInput,
  UpdateUserInput,
  UpdateUserNameInput,
  UserOrder,
} from './user.inputs';
import { PaginationArgs } from '../../common/pagination/pagination.args';

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
  @Query(() => User)
  async user(@UserEntity() user: User, @Args('id') id: string) {
    return this.userService.user(
      {
        userId: id,
      },
      user
    );
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserConnection)
  async users(
    @UserEntity() user: User,
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true }) query?: string,
    @Args({
      name: 'orderBy',
      type: () => UserOrder,
      nullable: true,
    })
    orderBy?: UserOrder
  ) {
    return this.userService.users(
      {
        paginationArgs: { skip, after, before, first, last },
        query,
        orderBy,
      },
      user
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changeUserRole(
    @UserEntity() user: User,
    @Args('input') input: ChangeUserRoleInput
  ) {
    return this.userService.changeUserRole(user, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async deleteUser(
    @UserEntity() user: User,
    @Args('input') input: DeleteUserInput
  ) {
    return this.userService.deleteUser(user, input);
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async toggleNotificationSettings(
    @UserEntity() user: User,
    @Args('input') input: ToggleNotificationSettingsInput
  ) {
    return this.userService.toggleNotificationSettings(user.id, input);
  }

  @ResolveField('playgroundSettings', () => PlaygroundSettings)
  playgroundSettings(@Parent() user: User) {
    return this.userService.playgroundSettings(user.id);
  }

  @ResolveField('userSettings', () => UserSettings)
  userSettings(@Parent() user: User) {
    return this.userService.userSettings(user.id);
  }
}
