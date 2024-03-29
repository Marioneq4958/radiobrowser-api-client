import { Axios } from 'axios';
import { Codec, Country, Language, State, Station, Tag } from './types/data';
import { ICodecs, ICountries, ILanguages, ISearchStation, IStates, ITags } from './types/queries';
import { ListOutputFormat, StationsListOutputFormat } from './types/formats';
import { JsonSerializer } from 'typescript-json-serializer';

export class RadioBrowserClient {
  private readonly axios: Axios;

  constructor(appName: string, appVersion: string) {
    this.axios = new Axios({
      headers: { 'User-Agent': `${appName}/${appVersion}` },
    });
  }

  private async getServers() {
    const data = JSON.parse((await this.axios.get('http://de1.api.radio-browser.info/json/servers')).data);
    const servers = data.map((server: { name: string }) => 'https://' + server.name);
    if (servers.length === 0) {
      throw new Error('No servers');
    }
    return servers;
  }

  private async sendRequest<T>(endpoint: string, outputFormat: string, params: any) {
    if (!this.axios.defaults.baseURL) {
      this.axios.defaults.baseURL = (await this.getServers())[0];
    }
    const response = await this.axios.get<T>(`/${outputFormat}/${endpoint}`, {
      params,
    });
    return response;
  }

  public async fetchStations(params: ISearchStation, outputFormat: StationsListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('stations/search', outputFormat, {
      name: params.name,
      nameExtact: params.nameExtact,
      country: params.country,
      countryExact: params.countryExact,
      countrycode: params.countryCode,
      state: params.state,
      stateExact: params.stateExact,
      language: params.language,
      languageExact: params.languageExact,
      tag: params.tag,
      tagEaxct: params.tagEaxct,
      tagList: params.tagList?.join(','),
      codec: params.codec,
      bitrateMin: params.bitrateMin,
      bitrateMax: params.bitrateMax,
      has_geo_info: params.hasGeoInfo,
      has_extended_info: params.hasExtenedInfo,
      is_https: params.isHttps,
      order: params.order,
      reverse: params.reverse,
      offset: params.offset,
      limit: params.limit,
      hidebroken: params.hideBroken,
    });
    return data;
  }

  public async searchStations(params: ISearchStation): Promise<Station[]> {
    const data = await this.fetchStations(params);
    return JSON.parse(data).map((station: any) => new JsonSerializer().deserialize(station, Station));
  }

  public async fetchCountries(params: ICountries, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`countries/${query}`, outputFormat, {
      order: params.order,
      reverse: params.reverse,
      hidebroken: params.hideBroken,
      offset: params.offset,
      limit: params.limit,
    });
    return data;
  }

  public async getCountries(params: ICountries, query: string = '') {
    const data = await this.fetchCountries(params, query);
    return JSON.parse(data).map((country: any) => new JsonSerializer().deserialize(country, Country));
  }

  public async fetchCodecs(params: ICodecs, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`codecs/${query}`, outputFormat, {
      order: params.order,
      reverse: params.reverse,
      hidebroken: params.hideBroken,
      offset: params.offset,
      limit: params.limit,
    });
    return data;
  }

  public async getCodecs(params: ICodecs, query: string = '') {
    const data = await this.fetchCodecs(params, query);
    return JSON.parse(data).map((codec: any) => new JsonSerializer().deserialize(codec, Codec));
  }

  public async fetchStates(params: IStates, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`states/${query}`, outputFormat, {
      order: params.order,
      reverse: params.reverse,
      hidebroken: params.hideBroken,
      offset: params.offset,
      limit: params.limit,
    });
    return data;
  }

  public async getStates(params: IStates, query: string = '') {
    const data = await this.fetchStates(params, query);
    return JSON.parse(data).map((state: any) => new JsonSerializer().deserialize(state, State));
  }

  public async fetchLanguages(params: ILanguages, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`languages/${query}`, outputFormat, {
      order: params.order,
      reverse: params.reverse,
      hidebroken: params.hideBroken,
      offset: params.offset,
      limit: params.limit,
    });
    return data;
  }

  public async getLanguages(params: ILanguages, query: string = '') {
    const data = await this.fetchLanguages(params, query);
    return JSON.parse(data).map((language: any) => new JsonSerializer().deserialize(language, Language));
  }

  public async fetchTags(params: ITags, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`tags/${query}`, outputFormat, {
      order: params.order,
      reverse: params.reverse,
      hidebroken: params.hideBroken,
      offset: params.offset,
      limit: params.limit,
    });
    return data;
  }

  public async getTags(params: ITags, query: string = '') {
    const data = await this.fetchTags(params, query);
    return JSON.parse(data).map((tag: any) => new JsonSerializer().deserialize(tag, Tag));
  }
}
