import { SongResolver } from './song.resolver';
import { SongService } from './song.service';
import { HttpModule, HttpService, Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { TabParserService } from '../../services/tabParserService/tabParser.service';

@Module({
  imports: [HttpModule],
  providers: [SongResolver, SongService, PrismaService, TabParserService],
})
export class SongModule {}
