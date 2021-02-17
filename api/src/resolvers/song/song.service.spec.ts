import { TabParserService } from '../../services/tabParserService/tabParser.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SongService } from './song.service';
import { PrismaService } from '../../services/prisma.service';
import * as faker from 'faker';
import { GuitarStyle, User } from '../user/user.model';
import { Difficulty } from './song.model';

describe('Song service', () => {
  let service: SongService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongService, TabParserService, PrismaService],
    }).compile();

    service = module.get<SongService>(SongService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a song', async () => {
    const aSong = await prisma.song.findFirst({});
    const serviceSong = await service.song({ songId: aSong.id });
    expect(serviceSong).toBeTruthy();
    expect(serviceSong.title).toEqual(aSong.title);
    expect(serviceSong.tab.tracks[0].measures).toBeTruthy();
  });

  it('should get paginated songs', async () => {
    const serviceSongs = await service.songs({
      filter: undefined,
      orderBy: undefined,
      query: '',
      paginationArgs: { first: 5 },
    });

    expect(serviceSongs.edges).toBeTruthy();
    serviceSongs.edges.forEach((el) => {
      expect(el.node).toBeTruthy();
      expect(el.cursor).toBeTruthy();
    });
    expect(serviceSongs.edges[0].node.title).toBeTruthy();
  });

  it('should create a song', async () => {
    const aUser = await prisma.user.findFirst({});
    const user = new User();
    user.id = aUser.id;

    const newSong = await service.createSong({
      user: user,
      input: {
        artist: faker.name.findName(),
        style: GuitarStyle.FINGERPICK,
        title: faker.internet.domainName(),
        tuning: 'standard',
        difficulty: Difficulty.EASY,
      },
    });

    const songDb = await prisma.song.findUnique({
      include: { tab: { include: { tracks: true } } },
      where: { id: newSong.id },
    });

    expect(songDb.id).toEqual(newSong.id);
    expect(songDb.tab.tracks[0].measures).toBeTruthy();
  });
});
