import { HttpService, Injectable } from '@nestjs/common';
import { GuitarProTab } from './guitarProTab.types';
import { ReadStream } from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';
import * as http from 'http';
import * as https from 'https';

@Injectable()
export class TabParserService {
  constructor(private readonly httpService: HttpService) {}

  async parseTab(file: ReadStream): Promise<GuitarProTab> {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(
      'https://guitarpro-parser-api.herokuapp.com/parsetab',
      { method: 'POST', body: form }
    );
    const data: GuitarProTab = await res.json();

    return data;
  }

  async parseLocalTab(): Promise<GuitarProTab> {
    const file = fs.createReadStream('songtest.gp5');
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(
      'https://guitarpro-parser-api.herokuapp.com/parsetab',
      { method: 'POST', body: form }
    );
    const data: GuitarProTab = await res.json();
    return data;
  }

  async parseUrlTab(url: string): Promise<GuitarProTab> {
    const response = await this.httpService.axiosRef({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const form = new FormData();
    form.append('file', response.data);
    const res = await fetch(
      'https://guitarpro-parser-api.herokuapp.com/parsetab',
      { method: 'POST', body: form }
    );
    const data: GuitarProTab = await res.json();

    return data;
  }
}
