import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { GuitarOrientation, GuitarStyle, GuitarType } from './user.model';

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
