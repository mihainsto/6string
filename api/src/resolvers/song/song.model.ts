import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../models/base.model';
import { GuitarStyle, User } from '../user/user.model';
import PaginatedResponse from '../../common/pagination/pagination';
import GraphQLJSON from 'graphql-type-json';

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

registerEnumType(Difficulty, {
  name: 'Difficulty',
});

@ObjectType()
export class Song extends BaseModel {
  title: string;
  artist: string;
  postedBy: User;
  difficulty: Difficulty;
  tuning?: string;
  style?: GuitarStyle;
  tab: Tab;
  inReview: boolean;
  submittedToReview: boolean;
  archived: boolean;
}

@ObjectType()
export class SongConnection extends PaginatedResponse(Song) {}

@ObjectType()
export class Tab extends BaseModel {
  tempo: number;
  tempoName: string;
  tracks: Track[];
}

@ObjectType()
export class Track extends BaseModel {
  offset: number;

  @Field(() => GraphQLJSON)
  measures: string;
}
