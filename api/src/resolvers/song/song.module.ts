import { SongResolver } from './song.resolver';
import { SongService } from './song.service';
import { HttpModule, Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { TabParserService } from '../../services/tabParserService/tabParser.service';
import { UserService } from '../user/user.service';
import { PasswordService } from '../../services/password.service';

@Module({
  imports: [HttpModule],
  providers: [
    SongResolver,
    SongService,
    PrismaService,
    TabParserService,
    UserService,
    PasswordService,
  ],
})
export class SongModule {}
