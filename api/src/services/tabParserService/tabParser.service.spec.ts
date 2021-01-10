import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import { TabParserService } from './tabParser.service';

describe('GuitarProParserService', () => {
  let service: TabParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TabParserService],
    }).compile();

    service = module.get<TabParserService>(TabParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse local file', async () => {
    const file = fs.createReadStream('songtest.gp5');
    const data = await service.parseTab(file);
    expect(data).toBeTruthy();
    expect(data.tracks).toBeTruthy();
  });
});
