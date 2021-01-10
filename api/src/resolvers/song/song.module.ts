import { SongResolver } from './song.resolver';
import { SongService } from './song.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { TabParserService } from '../../services/tabParserService/tabParser.service';

@Module({
  providers: [SongResolver, SongService, PrismaService, TabParserService],
})
export class SongModule {}
