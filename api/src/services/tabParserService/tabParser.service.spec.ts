import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import { TabParserService } from './tabParser.service';
import { HttpModule } from '@nestjs/common';

describe('GuitarProParserService', () => {
  let service: TabParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TabParserService],
      imports: [HttpModule],
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

  it('should parse url', async () => {
    const data = await service.parseUrlTab(
      'https://res.cloudinary.com/dizv2pxl0/raw/upload/v1613227764/project-sixstring/sm4yicuemqlgplixngvf.gp5'
    );
    expect(data).toBeTruthy();
    expect(data.tracks).toBeTruthy();
  });
});
