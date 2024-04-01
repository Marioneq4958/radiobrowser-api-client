import nock from 'nock';
import axios from 'axios';

describe('sum test', () => {
  beforeEach(() => {
    nock('http://example.com/').get('/calc/2+2').reply(200, { result: 4 });
  });
  it('2+2', async () => {
    const { data } = await axios.get('http://example.com/calc/2+2');
    console.log(data);
    expect(data).toStrictEqual({ result: 4 });
  });
});
