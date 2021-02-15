import {
  Field,
  ObjectType,
  registerEnumType,
  HideField,
} from '@nestjs/graphql';
import { BaseModel } from '../../models/base.model';
import { GraphQLBoolean } from 'graphql';
import PaginatedResponse from '../../common/pagination/pagination';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

export enum GuitarStyle {
  STRUM = 'STRUM',
  FINGERPICK = 'FINGERPICK',
}

export enum GuitarOrientation {
  LEFT_HANDED = 'LEFT_HANDED',
  RIGHT_HANDED = 'RIGHT_HANDED',
}
export enum GuitarType {
  CLASSICAL = 'CLASSICAL',
  ACOUSTIC = 'ACOUSTIC',
  ELECTRICAL = 'ELECTRICAL',
}

registerEnumType(GuitarStyle, {
  name: 'GuitarStyle',
});
registerEnumType(GuitarOrientation, {
  name: 'GuitarOrientation',
});
registerEnumType(GuitarType, {
  name: 'GuitarType',
});

@ObjectType()
export class PlaygroundSettings extends BaseModel {
  @Field(() => GuitarStyle)
  guitarStyle: GuitarStyle;

  @Field(() => GuitarOrientation)
  guitarOrientation: GuitarOrientation;

  @Field(() => GuitarType)
  guitarType: GuitarType;

  @Field(() => GraphQLBoolean)
  chordWidget: boolean;
}

@ObjectType()
export class UserSettings extends BaseModel {
  @Field(() => GraphQLBoolean)
  notificationEnabled: boolean;

  @Field(() => GraphQLBoolean)
  notificationRecommended: boolean;

  @Field(() => GraphQLBoolean)
  notificationAdminReview: boolean;
}

@ObjectType()
export class User extends BaseModel {
  email: string;
  username: string;
  avatarUrl?: string;
  role: Role;
  @HideField()
  password: string;
}

@ObjectType()
export class UserConnection extends PaginatedResponse(User) {}
