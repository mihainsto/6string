import {
  Field,
  ObjectType,
  registerEnumType,
  HideField,
} from '@nestjs/graphql';
import { BaseModel } from '../../models/base.model';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

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

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

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
  guitarStyle: GuitarStyle;
  guitarOrientation: GuitarOrientation;
  guitarType: GuitarType;
}

@ObjectType()
export class User extends BaseModel {
  email: string;
  username: string;
  avatarUrl?: string;
  role: Role;
  playgroundSettings: PlaygroundSettings;
  @HideField()
  password: string;
}
