import nock from 'nock';
import { RadioBrowserClient } from '../src/client';

// Fixtures
import JsonServers from './fixtures/json-servers.json';
import JsonStationsSearch from './fixtures/json-stations-search.json';
import JsonCodecs from './fixtures/json-codecs.json';
import JsonCountries from './fixtures/json-countries.json';
import JsonStates from './fixtures/json-states.json';
import JsonLanguages from './fixtures/json-languages.json';
import JsonTags from './fixtures/json-tags.json';

// Expected
import SearchStations from './expected/search-stations.json';
import GetCodecs from './expected/get-codecs.json';
import GetCountires from './expected/get-countries.json';
import GetStates from './expected/get-states.json';
import GetLanguages from './expected/get-languages.json';
import GetTags from './expected/get-tags.json';

describe('sum test', () => {
  let client: RadioBrowserClient;

  beforeEach(() => {
    nock('http://de1.api.radio-browser.info').get('/json/servers').reply(200, JsonServers);
    nock('https://fk1.api.radio-browser.info')
      .get('/json/stations/search?order=clickcount&reverse=true&limit=2')
      .reply(200, JsonStationsSearch)
      .get('/json/codecs/')
      .reply(200, JsonCodecs)
      .get('/json/countries/?limit=20')
      .reply(200, JsonCountries)
      .get('/json/states/?limit=20')
      .reply(200, JsonStates)
      .get('/json/languages/?limit=20')
      .reply(200, JsonLanguages)
      .get('/json/tags/?limit=20')
      .reply(200, JsonTags);
    client = new RadioBrowserClient('MyRadioApp', '0.1.0');
  });
  it('search stations', async () => {
    const data = await client.searchStations({ limit: 2, order: 'clickcount', reverse: true });
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(SearchStations);
  });
  it('get codecs', async () => {
    const data = await client.getCodecs({});
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetCodecs);
  });
  it('get countries', async () => {
    const data = await client.getCountries({ limit: 20 });
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetCountires);
  });
  it('get states', async () => {
    const data = await client.getStates({ limit: 20 });
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetStates);
  });
  it('get languages', async () => {
    const data = await client.getLanguages({ limit: 20 });
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetLanguages);
  });
  it('get tags', async () => {
    const data = await client.getTags({ limit: 20 });
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetTags);
  });
});
