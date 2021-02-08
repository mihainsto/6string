import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { Song } from '@prisma/client';
import {
  CreateSongInput,
  AddSongToFavoriteInput,
  SongFilter,
  SongOrder,
  RemoveSongFromFavoriteInput,
} from './song.inputs';
import { User } from '../user/user.model';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { TabParserService } from '../../services/tabParserService/tabParser.service';
import { fakeTab } from '../../../prisma/fakeTab';

@Injectable()
export class SongService {
  constructor(
    private prisma: PrismaService,
    private tabParser: TabParserService
  ) {}

  async song({ songId }: { songId: string }) {
    return this.prisma.song.findUnique({
      include: { tab: { include: { tracks: true } } },
      where: { id: songId },
    });
  }

  async songs(
    {
      paginationArgs,
      query,
      orderBy,
      filter,
      favorite,
    }: {
      paginationArgs: PaginationArgs;
      query?: string;
      orderBy?: SongOrder;
      filter?: SongFilter;
      favorite?: boolean;
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
    // TODO: Get a file from user input on the frontend
    const tab = await this.tabParser.parseLocalTab();
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
                  measures: tab.tracks[0].measures.map((x) =>
                    JSON.stringify(x)
                  ),
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
