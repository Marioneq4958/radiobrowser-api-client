export interface ISearchStation {
  name?: string;
  nameExtact?: boolean;
  country?: string;
  countryExact?: boolean;
  countryCode?: string;
  state?: string;
  stateExact?: boolean;
  language?: string;
  languageExact?: boolean;
  tag?: string;
  tagEaxct?: string;
  tagList?: string[];
  codec?: string;
  bitrateMin?: number;
  bitrateMax?: number;
  hasGeoInfo?: boolean;
  hasExtenedInfo?: boolean;
  isHttps?: boolean;
  order?:
    | 'name'
    | 'url'
    | 'homepage'
    | 'favicon'
    | 'tags'
    | 'country'
    | 'state'
    | 'language'
    | 'votes'
    | 'codec'
    | 'bitrate'
    | 'lastcheckok'
    | 'lastchecktime'
    | 'clicktimestamp'
    | 'clickcount'
    | 'clicktrend'
    | 'changetimestamp'
    | 'random';
  reverse?: boolean;
  offset?: number;
  limit?: number;
  hideBroken?: boolean;
}

export interface ICountries {
  order?: 'name' | 'stationcount';
  reverse?: boolean;
  hideBroken?: boolean;
  offset?: number;
  limit?: number;
}

export interface ICodecs {
  order?: 'name' | 'stationcount';
  reverse?: boolean;
  hideBroken?: boolean;
  offset?: number;
  limit?: number;
}

export interface IStates {
  order?: 'name' | 'stationcount';
  reverse?: boolean;
  hideBroken?: boolean;
  countryName?: string;
  offset?: number;
  limit?: number;
}

export interface ILanguages {
  order?: 'name' | 'stationcount';
  reverse?: boolean;
  hideBroken?: boolean;
  offset?: number;
  limit?: number;
}

export interface ITags {
  order?: 'name' | 'stationcount';
  reverse?: boolean;
  hideBroken?: boolean;
  offset?: number;
  limit?: number;
}
