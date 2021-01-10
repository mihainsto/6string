import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { SongService } from './song.service';
import { Song, SongConnection } from './song.model';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from '../user/user.model';
import { CreateSongInput, SongFilter, SongOrder } from './song.inputs';
import { PaginationArgs } from '../../common/pagination/pagination.args';

@Resolver((of) => Song)
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

  @Query(() => SongConnection)
  async songs(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true }) query: string,
    @Args({
      name: 'orderBy',
      type: () => SongOrder,
      nullable: true,
    })
    orderBy: SongOrder,
    @Args({ name: 'filter', type: () => SongFilter, nullable: true }) filter
  ) {
    return this.songService.songs({
      paginationArgs: { skip, after, before, first, last },
      query,
      orderBy,
      filter,
    });
  }
}
