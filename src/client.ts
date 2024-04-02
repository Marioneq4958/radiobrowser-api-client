import { Axios } from 'axios';
import {
  Codec,
  Country,
  Language,
  Server,
  ServerConfig,
  ServerStats,
  State,
  Station,
  StationCheck,
  StationCheckStep,
  StationClick,
  StationOldVersion,
  Tag,
} from './types/data';
import {
  ICodecs,
  ICountries,
  ILanguages,
  ISearchStation,
  IStates,
  IStationChecks,
  IStationCheckSteps,
  IStationClicks,
  IStationOldVersion,
  ITags,
} from './types/queries';
import { ListOutputFormat, ObjectOutputFromat, StationsListOutputFormat } from './types/formats';
import { JsonSerializer } from 'typescript-json-serializer';

export class RadioBrowserClient {
  private readonly axios: Axios;
  private readonly jsonSerializer: JsonSerializer;

  constructor(appName: string, appVersion: string) {
    this.axios = new Axios({
      headers: { 'User-Agent': `${appName}/${appVersion}` },
    });
    this.jsonSerializer = new JsonSerializer();
  }

  private async sendRequest<T>(endpoint: string, outputFormat: string, params: any, baseURL?: string) {
    if (!this.axios.defaults.baseURL && !baseURL) {
      const servers = await this.getServers();
      if (!servers.length) {
        throw new Error('No servers');
      }
      this.setServer(servers[0].name);
    }
    const response = await this.axios.get<T>(baseURL ? `${baseURL}/${outputFormat}/${endpoint}` : `/${outputFormat}/${endpoint}`, {
      params,
      paramsSerializer: {
        indexes: null,
      },
    });
    return response;
  }

  public async fetchServers(outputFormat: StationsListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(
      'servers',
      outputFormat,
      {},
      !this.axios.defaults.baseURL ? 'https://de1.api.radio-browser.info' : undefined,
    );
    return data;
  }

  public async getServers(): Promise<Server[]> {
    const data = await this.fetchServers();
    return this.jsonSerializer.deserialize(JSON.parse(data), Server) as Server[];
  }

  public setServer(serverName: string): void {
    this.axios.defaults.baseURL = `https://${serverName}`;
  }

  public async fetchStations(params: ISearchStation, outputFormat: StationsListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('stations/search', outputFormat, this.jsonSerializer.serialize(new ISearchStation(params)));
    return data;
  }

  public async searchStations(params: ISearchStation): Promise<Station[]> {
    const data = await this.fetchStations(params);
    return this.jsonSerializer.deserialize(JSON.parse(data), Station) as Station[];
  }

  public async fetchStationsByUUIDs(params: { stationUUIDs: string[] }, outputFormat: StationsListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('stations/byuuid', outputFormat, { uuids: params.stationUUIDs.join(',') });
    return data;
  }

  public async getStationsByUUIDs(params: { stationUUIDs: string[] }): Promise<Station[]> {
    const data = await this.fetchStationsByUUIDs(params);
    return this.jsonSerializer.deserialize(JSON.parse(data), Station) as Station[];
  }

  public async fetchCountries(params: ICountries, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`countries/${query}`, outputFormat, this.jsonSerializer.serialize(new ICountries(params)));
    return data;
  }

  public async getCountries(params: ICountries, query: string = ''): Promise<Country[]> {
    const data = await this.fetchCountries(params, query);
    return this.jsonSerializer.deserialize(JSON.parse(data), Country) as Country[];
  }

  public async fetchCodecs(params: ICodecs, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`codecs/${query}`, outputFormat, this.jsonSerializer.serialize(new ICodecs(params)));
    return data;
  }

  public async getCodecs(params: ICodecs, query: string = ''): Promise<Codec[]> {
    const data = await this.fetchCodecs(params, query);
    return this.jsonSerializer.deserialize(JSON.parse(data), Codec) as Codec[];
  }

  public async fetchStates(params: IStates, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`states/${query}`, outputFormat, this.jsonSerializer.serialize(new IStates(params)));
    return data;
  }

  public async getStates(params: IStates, query: string = ''): Promise<State[]> {
    const data = await this.fetchStates(params, query);
    return this.jsonSerializer.deserialize(JSON.parse(data), State) as State[];
  }

  public async fetchLanguages(params: ILanguages, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`languages/${query}`, outputFormat, this.jsonSerializer.serialize(new ILanguages(params)));
    return data;
  }

  public async getLanguages(params: ILanguages, query: string = ''): Promise<Language[]> {
    const data = await this.fetchLanguages(params, query);
    return this.jsonSerializer.deserialize(JSON.parse(data), Language) as Language[];
  }

  public async fetchTags(params: ITags, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`tags/${query}`, outputFormat, this.jsonSerializer.serialize(new ITags(params)));
    return data;
  }

  public async getTags(params: ITags, query: string = ''): Promise<Tag[]> {
    const data = await this.fetchTags(params, query);
    return this.jsonSerializer.deserialize(JSON.parse(data), Tag) as Tag[];
  }

  public async fetchStationChecks(params: IStationChecks, outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('checks', outputFormat, this.jsonSerializer.serialize(new IStationChecks(params)));
    return data;
  }

  public async getStationChecks(params: IStationChecks): Promise<StationCheck[]> {
    const data = await this.fetchStationChecks(params);
    return this.jsonSerializer.deserialize(JSON.parse(data), StationCheck) as StationCheck[];
  }

  public async fetchStationClicks(params: IStationClicks, outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('clicks', outputFormat, this.jsonSerializer.serialize(new IStationClicks(params)));
    return data;
  }

  public async getStationClicks(params: IStationClicks): Promise<StationClick[]> {
    const data = await this.fetchStationClicks(params);
    return this.jsonSerializer.deserialize(JSON.parse(data), StationClick) as StationClick[];
  }

  public async fetchStationCheckSteps(params: IStationCheckSteps, outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('checksteps', outputFormat, this.jsonSerializer.serialize(new IStationCheckSteps(params)));
    return data;
  }

  public async getStationCheckSteps(params: IStationCheckSteps): Promise<StationCheckStep[]> {
    const data = await this.fetchStationCheckSteps(params);
    return this.jsonSerializer.deserialize(JSON.parse(data), StationCheckStep) as StationCheckStep[];
  }

  public async fetchStationOldVersion(
    params: IStationOldVersion,
    stationUUID: string = '',
    outputFormat: ListOutputFormat = 'json',
  ): Promise<string> {
    const { data } = await this.sendRequest<string>(
      stationUUID !== '' ? `stations/changed/${stationUUID}` : 'stations/changed',
      outputFormat,
      this.jsonSerializer.serialize(new IStationOldVersion(params)),
    );
    return data;
  }

  public async getStationOldVersion(params: IStationOldVersion, stationUUID: string = ''): Promise<StationOldVersion[]> {
    const data = await this.fetchStationOldVersion(params, stationUUID);
    return this.jsonSerializer.deserialize(JSON.parse(data), StationOldVersion) as StationOldVersion[];
  }

  public async fetchServerStats(outputFormat: ObjectOutputFromat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('stats', outputFormat, {});
    return data;
  }

  public async getServerStats(): Promise<ServerStats> {
    const data = await this.fetchServerStats();
    return this.jsonSerializer.deserialize(JSON.parse(data), ServerStats) as ServerStats;
  }

  public async fetchServerConfig(outputFormat: ObjectOutputFromat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('config', outputFormat, {});
    return data;
  }

  public async getServerConfig(): Promise<ServerConfig> {
    const data = await this.fetchServerConfig();
    return this.jsonSerializer.deserialize(JSON.parse(data), ServerConfig) as ServerConfig;
  }

  public async voteForStation(stationUUID: string): Promise<void> {
    await this.sendRequest<string>(`vote/${stationUUID}`, 'json', {});
  }

  public async click(stationUUID: string): Promise<void> {
    await this.sendRequest<string>(`url/${stationUUID}`, 'json', {});
  }
}
