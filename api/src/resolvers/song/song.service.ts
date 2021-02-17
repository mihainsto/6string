import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { Song } from '@prisma/client';
import {
  AddSongToFavoriteInput,
  ApproveSongInput,
  CreateSongInput,
  DeleteSongInReviewInput,
  RemoveSongFromFavoriteInput,
  SongFilter,
  SongOrder,
  SubmitSongToReviewInput,
} from './song.inputs';
import { Role, User } from '../user/user.model';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { TabParserService } from '../../services/tabParserService/tabParser.service';
import { UserService } from '../user/user.service';

@Injectable()
export class SongService {
  constructor(
    private prisma: PrismaService,
    private tabParser: TabParserService,
    private userService: UserService
  ) {}

  async song({ songId }: { songId: string }, user: User) {
    const song = await this.prisma.song.findUnique({
      include: { tab: { include: { tracks: true } } },
      where: { id: songId },
    });

    if (song.inReview) {
      if (song.postedById === user.id || user.role === Role.ADMIN) {
        return song;
      } else {
        throw new Error('Unauthorized.');
      }
    }
    return song;
  }

  async songInReview({ songId }: { songId: string }, user: User) {
    const song = await this.prisma.song.findUnique({
      include: { tab: { include: { tracks: true } } },
      where: { id: songId },
    });

    if (song.postedById === user.id || user.role === Role.ADMIN) {
      return song;
    } else {
      throw new Error('Unauthorized.');
    }
  }

  async deleteSongInReview({ songId }: DeleteSongInReviewInput, user: User) {
    const song = await this.prisma.song.findUnique({
      include: { tab: { include: { tracks: true } } },
      where: { id: songId },
    });

    if (song.postedById === user.id || user.role === Role.ADMIN) {
      this.userService.createNotification({
        userId: song.postedById,
        message: `We found something wrong with ${song.title} by ${song.artist} and it has been rejected.`,
      });
      return this.prisma.song.update({
        where: { id: songId },
        data: { archived: true },
      });
    } else {
      throw new Error('Unauthorized.');
    }
  }

  async submitSongToReview({ songId }: SubmitSongToReviewInput, user: User) {
    const song = await this.prisma.song.findUnique({
      include: { tab: { include: { tracks: true } } },
      where: { id: songId },
    });

    if (song.postedById === user.id || user.role === Role.ADMIN) {
      this.userService.createNotification({
        userId: song.postedById,
        message: `Thank you! we have received ${song.title} by ${song.artist} and we will review soon`,
      });
      this.userService.createAdminNotification({
        message: `${song.title} by ${song.artist} was submitted to review by ${user.username}. Please review soon.`,
      });
      return this.prisma.song.update({
        where: { id: songId },
        data: { submittedToReview: true },
      });
    } else {
      throw new Error('Unauthorized.');
    }
  }

  async approveSong({ songId }: ApproveSongInput, user: User) {
    const song = await this.prisma.song.findUnique({
      include: { tab: { include: { tracks: true } } },
      where: { id: songId },
    });

    if (user.role === Role.ADMIN) {
      this.userService.createNotification({
        userId: song.postedById,
        message: `${song.title} by ${song.artist} has been reviewed and accepted!`,
      });
      return this.prisma.song.update({
        where: { id: songId },
        data: { inReview: false, submittedToReview: false },
      });
    } else {
      throw new Error('Unauthorized.');
    }
  }

  async songs(
    {
      paginationArgs,
      query,
      orderBy,
      filter,
      favorite,
      inReview,
    }: {
      paginationArgs: PaginationArgs;
      query?: string;
      orderBy?: SongOrder;
      filter?: SongFilter;
      favorite?: boolean;
      inReview?: boolean;
    },
    user: User | undefined
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.song.findMany({
          include: { tab: { include: { tracks: true } } },
          where: {
            OR: [
              { title: { contains: query || '' } },
              { artist: { contains: query || '' } },
            ],
            ...(filter &&
              filter.difficulty && { difficulty: filter.difficulty }),
            ...(filter && filter.style && { style: filter.style }),
            ...(filter && filter.tuning && { tuning: filter.tuning }),
            ...(user &&
              favorite && {
                favoriteUsers: {
                  some: {
                    id: user.id,
                  },
                },
              }),
            submittedToReview: inReview || false,
            inReview: inReview || false,
            archived: false,
          },
          ...(orderBy && { orderBy: { [orderBy.field]: orderBy.direction } }),
          ...args,
        }),
      () =>
        this.prisma.song.count({
          where: {
            OR: [
              { title: { contains: query || '' } },
              { artist: { contains: query || '' } },
            ],
            ...(filter &&
              filter.difficulty && { difficulty: filter.difficulty }),
            ...(filter && filter.style && { style: filter.style }),
            ...(filter && filter.tuning && { tuning: filter.tuning }),
            ...(user &&
              favorite && {
                favoriteUsers: {
                  some: {
                    id: user.id,
                  },
                },
              }),
            submittedToReview: inReview || false,
            inReview: inReview || false,
            archived: false,
          },
        }),
      {
        first: paginationArgs.first,
        last: paginationArgs.last,
        before: paginationArgs.before,
        after: paginationArgs.after,
      }
    );
  }

  async createSong({
    input,
    user,
  }: {
    input: CreateSongInput;
    user: User;
  }): Promise<Song> {
    const tab = await this.tabParser.parseUrlTab(input.tabUrl);

    return this.prisma.song.create({
      data: {
        title: input.title,
        artist: input.artist,
        difficulty: input.difficulty,
        tab: {
          create: {
            tempo: tab.tempo,
            tempoName: tab.tempoName,
            tracks: {
              create: [
                {
                  offset: tab.tracks[0].offset,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  measures: tab.tracks[0].measures,
                },
              ],
            },
          },
        },
        postedBy: { connect: { id: user.id } },
        tuning: input.tuning,
        style: input.style,
      },
    });
  }

  async addSongToFavorite({
    input,
    user,
  }: {
    input: AddSongToFavoriteInput;
    user: User;
  }): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: { id: input.songId },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        favoriteSongs: {
          connect: {
            id: song.id,
          },
        },
      },
    });

    return song;
  }

  async removeSongFromFavorite({
    input,
    user,
  }: {
    input: RemoveSongFromFavoriteInput;
    user: User;
  }): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: { id: input.songId },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        favoriteSongs: {
          disconnect: {
            id: song.id,
          },
        },
      },
    });

    return song;
  }

  async isFavorite({
    songId,
    user,
  }: {
    songId: string;
    user: User;
  }): Promise<boolean> {
    const userDb = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        favoriteSongs: true,
      },
    });

    const song = userDb.favoriteSongs.find((song) => song.id === songId);
    if (song) {
      return true;
    }
    return false;
  }
}
