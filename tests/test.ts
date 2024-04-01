import nock from 'nock';
import { RadioBrowserClient } from '../src/client';

// Fixtures
import JsonServers from './fixtures/json-servers.json';
import JsonStationsSearch from './fixtures/json-stations-search.json';

// Expected
import SearchStations from './expected/search-stations.json';

describe('sum test', () => {
  let client: RadioBrowserClient;

  beforeEach(() => {
    nock('http://de1.api.radio-browser.info').get('/json/servers').reply(200, JsonServers);
    nock('https://fk1.api.radio-browser.info').get('/json/stations/search?order=clickcount&reverse=true&limit=2').reply(200, JsonStationsSearch);
    client = new RadioBrowserClient('MyRadioApp', '0.1.0');
  });
  it('search stations', async () => {
    const data = await client.searchStations({ limit: 2, order: 'clickcount', reverse: true });
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(SearchStations);
  });
});
