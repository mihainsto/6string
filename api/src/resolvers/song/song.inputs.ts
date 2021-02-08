import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { GuitarStyle } from '../user/user.model';
import { Difficulty } from './song.model';
import { Order } from '../../common/order/order';

export enum SongOrderField {
  id = 'id',
  createdAt = 'createdAt',
  title = 'title',
  artist = 'artist',
  postedBy = 'postedBy',
  difficulty = 'difficulty',
  tuning = 'tuning',
  style = 'style',
}

registerEnumType(SongOrderField, {
  name: 'SongOrderField',
  description: 'Properties by which song connections can be ordered.',
});

@InputType()
export class CreateSongInput {
  @Field()
  title: string;

  @Field()
  artist: string;

  @Field(() => Difficulty)
  difficulty: Difficulty;

  @Field()
  tuning: string;

  @Field(() => GuitarStyle, { nullable: true })
  style?: GuitarStyle;
}

@InputType()
export class SongOrder extends Order {
  @Field(() => SongOrderField)
  field: SongOrderField;
}

@InputType()
export class SongFilter {
  @Field(() => Difficulty, { nullable: true })
  difficulty: Difficulty;

  @Field(() => GuitarStyle, { nullable: true })
  style: GuitarStyle;

  @Field({ nullable: true })
  tuning: string;
}

@InputType()
export class AddSongToFavoriteInput {
  @Field(() => ID)
  songId: string;
}

@InputType()
export class RemoveSongFromFavoriteInput {
  @Field(() => ID)
  songId: string;
}
