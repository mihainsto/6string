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
  DeleteSongInReviewInput,
  SubmitSongToReviewInput,
  ApproveSongInput,
} from './song.inputs';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { GraphQLBoolean } from 'graphql';

@Resolver(() => Song)
export class SongResolver {
  constructor(private songService: SongService) {}

  @UseGuards(GqlAuthGuardOptional)
  @Query(() => Song)
  async song(@Args('id') id: string, @UserEntity() user: User) {
    return this.songService.song({ songId: id }, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Song)
  async songInReview(@UserEntity() user: User, @Args('id') id: string) {
    return this.songService.songInReview({ songId: id }, user);
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

  @UseGuards(GqlAuthGuardOptional)
  @Query(() => SongConnection)
  async songsInReview(
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
        inReview: true,
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Song)
  async deleteSongInReview(
    @UserEntity() user: User,
    @Args('input') input: DeleteSongInReviewInput
  ) {
    return this.songService.deleteSongInReview(input, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Song)
  async submitSongToReview(
    @UserEntity() user: User,
    @Args('input') input: SubmitSongToReviewInput
  ) {
    return this.songService.submitSongToReview(input, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Song)
  async approveSong(
    @UserEntity() user: User,
    @Args('input') input: ApproveSongInput
  ) {
    return this.songService.approveSong(input, user);
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
