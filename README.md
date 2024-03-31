# radiobrowser-api-client

Typescript module for [Radio Browser API](https://api.radio-browser.info/).

## Usage

```ts
const radioBrowserClient = new RadioBrowserClient('My Radio App', '1.0'); /* Initialize the client. */

const stationsXML = radioBrowserClient.fetchStations({ limit: 10, order: 'random' }, 'xml') /* Get 10 random stations in xml format. */
const stations = radioBrowserClient.searchStations({ limit: 10, order: 'random' }); /* Get 10 random stations in object array. */
```
