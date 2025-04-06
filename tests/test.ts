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
import JsonChecks from './fixtures/json-checks.json';
import JsonClicks from './fixtures/json-clicks.json';
import JsonChecksteps from './fixtures/json-checksteps.json';
import JsonStationsChanged from './fixtures/json-stations-changed.json';
import JsonStats from './fixtures/json-stats.json';
import JsonConfig from './fixtures/json-config.json';
import JsonUrl from './fixtures/json-url.json';
import JsonVote from './fixtures/json-vote.json';

// Expected
import SearchStations from './expected/search-stations.json';
import GetCodecs from './expected/get-codecs.json';
import GetCountires from './expected/get-countries.json';
import GetStates from './expected/get-states.json';
import GetLanguages from './expected/get-languages.json';
import GetTags from './expected/get-tags.json';
import GetStationChecks from './expected/get-station-checks.json';
import GetStationClicks from './expected/get-station-clicks.json';
import GetStationCheckSteps from './expected/get-station-check-steps.json';
import GetStationOldVersion from './expected/get-station-old-version.json';
import GetServerStats from './expected/get-server-stats.json';
import GetServerConfig from './expected/get-server-config.json';

describe('main test', () => {
  let client: RadioBrowserClient;

  beforeEach(() => {
    nock('https://all.api.radio-browser.info').get('/json/servers').reply(200, JsonServers);
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
      .reply(200, JsonTags)
      .get('/json/checks?limit=3')
      .reply(200, JsonChecks)
      .get('/json/clicks?seconds=5')
      .reply(200, JsonClicks)
      .get('/json/checksteps?uuids=82b1fe45-50cb-4cd7-92db-02f42ac5d52e')
      .reply(200, JsonChecksteps)
      .get('/json/stations/changed?limit=5')
      .reply(200, JsonStationsChanged)
      .get('/json/stats')
      .reply(200, JsonStats)
      .get('/json/config')
      .reply(200, JsonConfig)
      .get('/json/url/82b1fe45-50cb-4cd7-92db-02f42ac5d52e')
      .reply(200, JsonUrl)
      .get('/json/vote/82b1fe45-50cb-4cd7-92db-02f42ac5d52e')
      .reply(200, JsonVote);
    client = new RadioBrowserClient('MyRadioApp', '0.1.0');
  });
  it('get servers', async () => {
    const data = await client.getServers();
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(JsonServers);
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
  it('get station checks', async () => {
    const data = await client.getStationChecks({ limit: 3 });
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetStationChecks);
  });
  it('get station clicks', async () => {
    const data = await client.getStationClicks({ seconds: 5 });
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetStationClicks);
  });
  it('get station check steps', async () => {
    const data = await client.getStationCheckSteps({ UUIDs: ['82b1fe45-50cb-4cd7-92db-02f42ac5d52e'] });
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetStationCheckSteps);
  });
  it('get station old version', async () => {
    const data = await client.getStationOldVersion({ limit: 5 });
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetStationOldVersion);
  });
  it('get server stats', async () => {
    const data = await client.getServerStats();
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetServerStats);
  });
  it('get server config', async () => {
    const data = await client.getServerConfig();
    expect(JSON.parse(JSON.stringify(data))).toStrictEqual(GetServerConfig);
  });
  it('click', async () => {
    await client.click('82b1fe45-50cb-4cd7-92db-02f42ac5d52e');
  });
  it('vote for station', async () => {
    await client.voteForStation('82b1fe45-50cb-4cd7-92db-02f42ac5d52e');
  });
});
