import { JsonProperty, JsonObject } from 'typescript-json-serializer';

@JsonObject()
export class Station {
  @JsonProperty({ name: 'changeuuid' })
  public changeUUID: string;

  @JsonProperty({ name: 'stationuuid' })
  public stationUUID: string;

  @JsonProperty()
  public name: string;

  @JsonProperty()
  public url: string;

  @JsonProperty({ name: 'url_resolved' })
  public urlResolved: string;

  @JsonProperty({ name: 'homepage' })
  public homepageUrl: string;

  @JsonProperty({ name: 'favicon' })
  public faviconUrl: string | null;

  @JsonProperty({ name: 'tags', beforeDeserialize: (value: string) => value.split(',') })
  public tags: string[];

  @JsonProperty({ name: 'country' })
  public countryName: string;

  @JsonProperty({ name: 'countrycode' })
  public countryCode: string;

  @JsonProperty()
  public state: string;

  @JsonProperty({ name: 'language' })
  public languageNames: string;

  @JsonProperty({ name: 'languagecodes' })
  public languageCodes: string;

  @JsonProperty()
  public votes: number;

  @JsonProperty({ name: 'lastchangetime_iso8601' })
  public lastChangeTime: Date;

  @JsonProperty()
  public codec: string;

  @JsonProperty()
  public bitrate: number;

  @JsonProperty({ beforeDeserialize: (value) => Boolean(value) })
  public hls: boolean;

  @JsonProperty({ name: 'lastcheckok', beforeDeserialize: (value: number) => Boolean(value) })
  public lastCheckOk: boolean;

  @JsonProperty({ name: 'lastchecktime_iso8601' })
  public lastCheckDate: Date;

  @JsonProperty({ name: 'lastcheckoktime_iso8601' })
  public lastCheckOkDate: Date;

  @JsonProperty({ name: 'clicktimestamp_iso8601' })
  public lastClickDate: Date;

  @JsonProperty({ name: 'clickcount' })
  public clickCount: number;

  @JsonProperty({ name: 'clicktrend' })
  public clickTrend: number;

  @JsonProperty({ name: 'ssl_error', beforeDeserialize: (value: number) => Boolean(value) })
  public sslError: boolean;

  @JsonProperty({ name: 'geo_lat' })
  public geoLat: number | null;

  @JsonProperty({ name: 'geo_long' })
  public geoLong: number | null;

  @JsonProperty({ name: 'has_extended_info' })
  public hasExtendedInfo: boolean | null;
}

@JsonObject()
export class Country {
  @JsonProperty()
  public name: string;

  @JsonProperty({ name: 'iso_3166_1' })
  public code: string;

  @JsonProperty({ name: 'stationcount' })
  public stationCount: number;
}

@JsonObject()
export class Codec {
  @JsonProperty()
  public name: string;

  @JsonProperty({ name: 'stationcount' })
  public stationCount: number;
}

@JsonObject()
export class State {
  @JsonProperty()
  public name: string;

  @JsonProperty({ name: 'country' })
  public countryName: string;

  @JsonProperty({ name: 'stationcount' })
  public stationCount: number;
}

@JsonObject()
export class Language {
  @JsonProperty()
  public name: string;

  @JsonProperty({ name: 'iso_639' })
  public code: string | null;

  @JsonProperty({ name: 'stationcount' })
  public stationCount: number;
}

@JsonObject()
export class Tag {
  @JsonProperty()
  public name: string;

  @JsonProperty({ name: 'stationcount' })
  public stationCount: number;
}
