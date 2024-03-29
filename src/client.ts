import { Axios } from 'axios';

export class RadioBrowserClient {
  private readonly axios: Axios;

  constructor(appName: string, appVersion: string) {
    this.axios = new Axios({
      headers: { 'User-Agent': `${appName}/${appVersion}` },
    });
  }

  private async getServers() {
    const data = JSON.parse((await this.axios.get('http://all.api.radio-browser.info/json/servers')).data);
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
}
