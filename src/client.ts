import { Axios, AxiosInstance } from 'axios';
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
import axiosRetry from 'axios-retry';

export class RadioBrowserClient {
  private readonly axios: Axios;
  private readonly jsonSerializer: JsonSerializer;

  /**
   * Constructor for RadioBrowserClient class.
   * @param appName - Name of your application
   * @param appVersion - Version of your application
   */
  constructor(appName: string, appVersion: string) {
    this.axios = new Axios({
      headers: { 'User-Agent': `${appName}/${appVersion}` },
    });
    axiosRetry(this.axios as AxiosInstance, { retries: 3, retryDelay: (retryCount) => retryCount * 100 });
    this.jsonSerializer = new JsonSerializer();
  }

  /**
   * Sends request to the Radio Browser API.
   * @param endpoint - The endpoint of the API
   * @param outputFormat - The format of the server response
   * @param params - The parameters for the request
   * @param baseURL - The base URL of the server (if axios.defaults.baseURL is set, it is not required)
   * @returns The server response
   */
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

  /**
   * Fetches the list of available servers from the Radio Browser API.
   * @param outputFormat - The output format for the list of servers (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#Server_mirrors} for more information on the API endpoint
   * @returns A promise that resolves to the list of servers
   */
  public async fetchServers(outputFormat: StationsListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(
      'servers',
      outputFormat,
      {},
      !this.axios.defaults.baseURL ? 'https://de1.api.radio-browser.info' : undefined,
    );
    return data;
  }

  /**
   * Fetches and parses the list of available servers from the Radio Browser API.
   * @see {@link https://de1.api.radio-browser.info/#Server_mirrors} for more information on the API endpoint
   * @returns A promise that resolves to the list of servers
   */
  public async getServers(): Promise<Server[]> {
    const data = await this.fetchServers();
    return this.jsonSerializer.deserialize(JSON.parse(data), Server) as Server[];
  }

  /**
   * Sets the server to be used for subsequent requests.
   * @param serverName - The name of the server
   */
  public setServer(serverName: string): void {
    this.axios.defaults.baseURL = `https://${serverName}`;
  }

  /**
   * Fetches stations from the Radio Browser API.
   * @param params - The search parameters
   * @param outputFormat - The output format for the list of stations (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#Advanced_station_search} for more information on the API endpoint
   * @returns A promise that resolves to the list of stations
   */
  public async fetchStations(params: ISearchStation, outputFormat: StationsListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('stations/search', outputFormat, this.jsonSerializer.serialize(new ISearchStation(params)));
    return data;
  }

  /**
   * Fetches and parses stations from the Radio Browser API.
   * @param params - The search parameters
   * @returns A promise that resolves to the list of stations
   */
  public async searchStations(params: ISearchStation): Promise<Station[]> {
    const data = await this.fetchStations(params);
    return this.jsonSerializer.deserialize(JSON.parse(data), Station) as Station[];
  }

  /**
   * Fetches stations from the Radio Browser API by given UUIDs.
   * @param params - The search parameters
   * @param outputFormat - The output format for the list of stations (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#Search_radio_stations_by_uuid} for more information on the API endpoint
   * @returns A promise that resolves to the list of stations by given UUIDs
   */
  public async fetchStationsByUUIDs(params: { stationUUIDs: string[] }, outputFormat: StationsListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('stations/byuuid', outputFormat, { uuids: params.stationUUIDs.join(',') });
    return data;
  }

  /**
   * Fetches and parses stations from the Radio Browser API by given UUIDs.
   * @param params - The search parameters
   * @see {@link https://de1.api.radio-browser.info/#Search_radio_stations_by_uuid} for more information on the API endpoint
   * @returns A promise that resolves to the list of stations by given UUIDs
   */
  public async getStationsByUUIDs(params: { stationUUIDs: string[] }): Promise<Station[]> {
    const data = await this.fetchStationsByUUIDs(params);
    return this.jsonSerializer.deserialize(JSON.parse(data), Station) as Station[];
  }

  /**
   * Fetches countries from the Radio Browser API.
   * @param params - The search parameters
   * @param query - The search query
   * @param outputFormat - The output format for the list of countires (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#List_of_countries} for more information on the API endpoint
   * @returns A promise that resolves to the list of countires
   */
  public async fetchCountries(params: ICountries, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`countries/${query}`, outputFormat, this.jsonSerializer.serialize(new ICountries(params)));
    return data;
  }

  /**
   * Fetches and parses list of countries from the Radio Browser API.
   * @param params - The search parameters
   * @param query - The search query
   * @see {@link https://de1.api.radio-browser.info/#List_of_countries} for more information on the API endpoint
   * @returns A promise that resolves to the list of countires
   */
  public async getCountries(params: ICountries, query: string = ''): Promise<Country[]> {
    const data = await this.fetchCountries(params, query);
    return this.jsonSerializer.deserialize(JSON.parse(data), Country) as Country[];
  }

  /**
   * Fetches codecs from the Radio Browser API.
   * @param params - The search parameters
   * @param query - The search query
   * @param outputFormat - The output format for the list of codecs (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#List_of_codecs} for more information on the API endpoint
   * @returns A promise that resolves to the list of codecs
   */
  public async fetchCodecs(params: ICodecs, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`codecs/${query}`, outputFormat, this.jsonSerializer.serialize(new ICodecs(params)));
    return data;
  }

  /**
   * Fetches and parses codecs from the Radio Browser API.
   * @param params - The search parameters
   * @param query - The search query
   * @see {@link https://de1.api.radio-browser.info/#List_of_codecs} for more information on the API endpoint
   * @returns A promise that resolves to the list of codecs
   */
  public async getCodecs(params: ICodecs, query: string = ''): Promise<Codec[]> {
    const data = await this.fetchCodecs(params, query);
    return this.jsonSerializer.deserialize(JSON.parse(data), Codec) as Codec[];
  }

  /**
   * Fetches states from the Radio Browser API.
   * @param params - The search parameters
   * @param query - The search query
   * @param outputFormat - The output format for the list of states (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#List_of_states} for more information on the API endpoint
   * @returns A promise that resolves to the list of states
   */
  public async fetchStates(params: IStates, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`states/${query}`, outputFormat, this.jsonSerializer.serialize(new IStates(params)));
    return data;
  }

  /**
   * Fetches and parses states from the Radio Browser API.
   * @param params - The search parameters
   * @param query - The search query
   * @see {@link https://de1.api.radio-browser.info/#List_of_states} for more information on the API endpoint
   * @returns A promise that resolves to the list of states
   */
  public async getStates(params: IStates, query: string = ''): Promise<State[]> {
    const data = await this.fetchStates(params, query);
    return this.jsonSerializer.deserialize(JSON.parse(data), State) as State[];
  }

  /**
   * Fetches languages from the Radio Browser API.
   * @param params - The search parameters
   * @param query - The search query
   * @param outputFormat - The output format for the list of languages (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#List_of_languages} for more information on the API endpoint
   * @returns A promise that resolves to the list of languages
   */
  public async fetchLanguages(params: ILanguages, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`languages/${query}`, outputFormat, this.jsonSerializer.serialize(new ILanguages(params)));
    return data;
  }

  /**
   * Fetches and parses languages from the Radio Browser API.
   * @param params - The search parameters
   * @param query - The search query
   * @see {@link https://de1.api.radio-browser.info/#List_of_languages} for more information on the API endpoint
   * @returns A promise that resolves to the list of languages
   */
  public async getLanguages(params: ILanguages, query: string = ''): Promise<Language[]> {
    const data = await this.fetchLanguages(params, query);
    return this.jsonSerializer.deserialize(JSON.parse(data), Language) as Language[];
  }

  /**
   * Fetches tags from the Radio Browser API.
   * @param params - The search parameters
   * @param query - The search query
   * @param outputFormat - The output format for the list of tags (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#List_of_tags} for more information on the API endpoint
   * @returns A promise that resolves to the list of tags
   */
  public async fetchTags(params: ITags, query: string = '', outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>(`tags/${query}`, outputFormat, this.jsonSerializer.serialize(new ITags(params)));
    return data;
  }

  /**
   * Fetches and parses tags from the Radio Browser API.
   * @param params - The search parameters
   * @param query - The search query
   * @see {@link https://de1.api.radio-browser.info/#List_of_tags} for more information on the API endpoint
   * @returns A promise that resolves to the list of tags
   */
  public async getTags(params: ITags, query: string = ''): Promise<Tag[]> {
    const data = await this.fetchTags(params, query);
    return this.jsonSerializer.deserialize(JSON.parse(data), Tag) as Tag[];
  }

  /**
   * Fetches station checks from the Radio Browser API.
   * @param params - The search parameters
   * @param outputFormat - The output format for the list of station checks (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#List_of_station_check_results} for more information on the API endpoint
   * @returns A promise that resolves to the list of station checks
   */
  public async fetchStationChecks(params: IStationChecks, outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('checks', outputFormat, this.jsonSerializer.serialize(new IStationChecks(params)));
    return data;
  }

  /**
   * Fetches and parses station checks from the Radio Browser API.
   * @param params - The search parameters
   * @see {@link https://de1.api.radio-browser.info/#List_of_station_check_results} for more information on the API endpoint
   * @returns A promise that resolves to the list of station checks
   */
  public async getStationChecks(params: IStationChecks): Promise<StationCheck[]> {
    const data = await this.fetchStationChecks(params);
    return this.jsonSerializer.deserialize(JSON.parse(data), StationCheck) as StationCheck[];
  }

  /**
   * Fetches station clicks from the Radio Browser API.
   * @param params - The search parameters
   * @param outputFormat - The output format for the list of station clicks (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#List_of_station_clicks} for more information on the API endpoint
   * @returns A promise that resolves to the list of station clicks
   */
  public async fetchStationClicks(params: IStationClicks, outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('clicks', outputFormat, this.jsonSerializer.serialize(new IStationClicks(params)));
    return data;
  }

  /**
   * Fetches and parses station clicks from the Radio Browser API.
   * @param params - The search parameters
   * @see {@link https://de1.api.radio-browser.info/#List_of_station_clicks} for more information on the API endpoint
   * @returns A promise that resolves to the list of station clicks
   */
  public async getStationClicks(params: IStationClicks): Promise<StationClick[]> {
    const data = await this.fetchStationClicks(params);
    return this.jsonSerializer.deserialize(JSON.parse(data), StationClick) as StationClick[];
  }

  /**
   * Fetches station check steps from the Radio Browser API.
   * @param params - The search parameters
   * @param outputFormat - The output format for the list of station check steps (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#List_of_station_check_steps} for more information on the API endpoint
   * @returns A promise that resolves to the list of station check steps
   */
  public async fetchStationCheckSteps(params: IStationCheckSteps, outputFormat: ListOutputFormat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('checksteps', outputFormat, this.jsonSerializer.serialize(new IStationCheckSteps(params)));
    return data;
  }

  /**
   * Fetches and parses station check steps from the Radio Browser API.
   * @param params - The search parameters
   * @param outputFormat - The output format for the list of station check steps (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#List_of_station_check_steps} for more information on the API endpoint
   * @returns A promise that resolves to the list of station check steps
   */
  public async getStationCheckSteps(params: IStationCheckSteps): Promise<StationCheckStep[]> {
    const data = await this.fetchStationCheckSteps(params);
    return this.jsonSerializer.deserialize(JSON.parse(data), StationCheckStep) as StationCheckStep[];
  }

  /**
   * Fetches old versions of station from the Radio Browser API.
   * @param params - The search parameters
   * @param outputFormat - The output format for the list of station old versions (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#Old_versions_of_stations} for more information on the API endpoint
   * @returns A promise that resolves to the list of station old versions
   */
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

  /**
   * Fetches and parses old versions of station from the Radio Browser API.
   * @param params - The search parameters
   * @see {@link https://de1.api.radio-browser.info/#Old_versions_of_stations} for more information on the API endpoint
   * @returns A promise that resolves to the list of station old versions
   */
  public async getStationOldVersion(params: IStationOldVersion, stationUUID: string = ''): Promise<StationOldVersion[]> {
    const data = await this.fetchStationOldVersion(params, stationUUID);
    return this.jsonSerializer.deserialize(JSON.parse(data), StationOldVersion) as StationOldVersion[];
  }

  /**
   * Fetches server stats from the Radio Browser API.
   * @param outputFormat - The output format for the server stats (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#Server_stats} for more information on the API endpoint
   * @returns A promise that resolves to the server stats
   */
  public async fetchServerStats(outputFormat: ObjectOutputFromat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('stats', outputFormat, {});
    return data;
  }

  /**
   * Fetches and parses server stats from the Radio Browser API.
   * @see {@link https://de1.api.radio-browser.info/#Server_stats} for more information on the API endpoint
   * @returns A promise that resolves to the server stats
   */
  public async getServerStats(): Promise<ServerStats> {
    const data = await this.fetchServerStats();
    return this.jsonSerializer.deserialize(JSON.parse(data), ServerStats) as ServerStats;
  }

  /**
   * Fetches server config from the Radio Browser API.
   * @param outputFormat - The output format for the server config (default is JSON)
   * @see {@link https://de1.api.radio-browser.info/#Server_config} for more information on the API endpoint
   * @returns A promise that resolves to the server config
   */
  public async fetchServerConfig(outputFormat: ObjectOutputFromat = 'json'): Promise<string> {
    const { data } = await this.sendRequest<string>('config', outputFormat, {});
    return data;
  }

  /**
   * Fetches server config from the Radio Browser API.
   * @see {@link https://de1.api.radio-browser.info/#Server_config} for more information on the API endpoint
   * @returns A promise that resolves to the server config
   */
  public async getServerConfig(): Promise<ServerConfig> {
    const data = await this.fetchServerConfig();
    return this.jsonSerializer.deserialize(JSON.parse(data), ServerConfig) as ServerConfig;
  }

  /**
   * Votes for the station by given UUID.
   * @see {@link https://de1.api.radio-browser.info/#Vote_for_station} for more information on the API endpoint
   * @param stationUUID - The UUID of the station to vote for
   */
  public async voteForStation(stationUUID: string): Promise<void> {
    await this.sendRequest<string>(`vote/${stationUUID}`, 'json', {});
  }

  /**
   * Logs a click for the station by given UUID.
   * @see {@link https://de1.api.radio-browser.info/#Count_station_click} for more information on the API endpoint
   * @param stationUUID - The UUID of the station for which the click is logged
   */
  public async click(stationUUID: string): Promise<void> {
    await this.sendRequest<string>(`url/${stationUUID}`, 'json', {});
  }
}
