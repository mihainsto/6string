import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { GuitarOrientation, GuitarStyle, GuitarType } from './user.model';
import { GraphQLBoolean } from 'graphql';

@InputType()
export class UpdatePlaygroundSettings {
  @Field(() => GuitarStyle, { nullable: true })
  guitarStyle?: GuitarStyle;

  @Field(() => GuitarOrientation, { nullable: true })
  guitarOrientation?: GuitarOrientation;

  @Field(() => GuitarType, { nullable: true })
  guitarType?: GuitarType;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field({ nullable: true })
  playgroundSettings?: UpdatePlaygroundSettings;

  @Field({ nullable: true })
  email?: string;
}

@InputType()
export class UpdateUserNameInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  username: string;
}

@InputType()
export class UpdateUserEmailInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  email: string;
}

@InputType()
export class UpdateUserAvatarInput {
  @Field()
  avatarUrl: string;
}

@InputType()
export class UpdatePlaygroundSettingsInput {
  @Field()
  playgroundSettings: UpdatePlaygroundSettings;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}

@InputType()
export class ToggleNotificationSettingsInput {
  @Field(() => GraphQLBoolean, { nullable: true })
  notificationEnabled?: boolean;

  @Field(() => GraphQLBoolean, { nullable: true })
  notificationRecommended?: boolean;

  @Field(() => GraphQLBoolean, { nullable: true })
  notificationAdminReview?: boolean;
}
