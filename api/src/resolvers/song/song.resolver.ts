import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  GqlAuthGuard,
  GqlAuthGuardOptional,
} from '../../guards/gql-auth.guard';
import { SongService } from './song.service';
import { Song, SongConnection } from './song.model';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from '../user/user.model';
import {
  CreateSongInput,
  AddSongToFavoriteInput,
  SongFilter,
  SongOrder,
  RemoveSongFromFavoriteInput,
} from './song.inputs';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { GraphQLBoolean } from 'graphql';

@Resolver(() => Song)
export class SongResolver {
  constructor(private songService: SongService) {}

  @Query(() => Song)
  async song(@Args('id') id: string) {
    return this.songService.song({ songId: id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Song)
  async createSong(
    @UserEntity() user: User,
    @Args('input') input: CreateSongInput
  ) {
    return this.songService.createSong({ input, user });
  }

  @UseGuards(GqlAuthGuardOptional)
  @Query(() => SongConnection)
  async songs(
    @UserEntity() user: User,
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true }) query?: string,
    @Args({
      name: 'orderBy',
      type: () => SongOrder,
      nullable: true,
    })
    orderBy?: SongOrder,
    @Args({ name: 'filter', type: () => SongFilter, nullable: true })
    filter?: SongFilter,
    @Args({ name: 'favorite', nullable: true })
    favorite?: boolean
  ) {
    return this.songService.songs(
      {
        paginationArgs: { skip, after, before, first, last },
        query,
        orderBy,
        filter,
        favorite,
      },
      user
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Song)
  async addSongToFavorite(
    @UserEntity() user: User,
    @Args('input') input: AddSongToFavoriteInput
  ) {
    return this.songService.addSongToFavorite({ user, input });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Song)
  async removeSongFromFavorite(
    @UserEntity() user: User,
    @Args('input') input: RemoveSongFromFavoriteInput
  ) {
    return this.songService.removeSongFromFavorite({ user, input });
  }

  @UseGuards(GqlAuthGuardOptional)
  @ResolveField(() => GraphQLBoolean)
  async favorite(
    @Parent() song: Song,
    @UserEntity() user: User
  ): Promise<boolean> {
    if (user) {
      return this.songService.isFavorite({ songId: song.id, user });
    } else {
      return false;
    }
  }
}
