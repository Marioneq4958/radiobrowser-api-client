import { JsonProperty, JsonObject } from 'typescript-json-serializer';

@JsonObject()
export class ISearchStation {
  @JsonProperty()
  public name?: string;

  @JsonProperty()
  public nameExact?: boolean;

  @JsonProperty({ name: 'country' })
  public countryName?: string;

  @JsonProperty()
  public countryExact?: boolean;

  @JsonProperty({ name: 'countrycode' })
  public countryCode?: string;

  @JsonProperty()
  public state?: string;

  @JsonProperty()
  public stateExact?: boolean;

  @JsonProperty({ name: 'language' })
  public languageName?: string;

  @JsonProperty()
  public languageExact?: boolean;

  @JsonProperty()
  public tag?: string;

  @JsonProperty()
  public tagExact?: string;

  @JsonProperty({ beforeSerialize: (value?: string[]) => (value ? value.join(',') : []) })
  public tagList?: string[];

  @JsonProperty()
  public codec?: string;

  @JsonProperty()
  public bitrateMin?: number;

  @JsonProperty()
  public bitrateMax?: number;

  @JsonProperty({ name: 'has_geo_info' })
  public hasGeoInfo?: boolean;

  @JsonProperty({ name: 'has_extended_info' })
  public hasExtendedInfo?: boolean;

  @JsonProperty({ name: 'is_https' })
  public isHttps?: boolean;

  @JsonProperty()
  public order?:
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

  @JsonProperty()
  public reverse?: boolean;

  @JsonProperty()
  public offset?: number;

  @JsonProperty()
  public limit?: number;

  @JsonProperty({ name: 'hidebroken' })
  public hideBroken?: boolean;

  constructor(data: ISearchStation) {
    Object.assign(this, data);
  }
}

@JsonObject()
export class ICountries {
  @JsonProperty()
  public order?: 'name' | 'stationcount';

  @JsonProperty()
  public reverse?: boolean;

  @JsonProperty({ name: 'hidebroken' })
  public hideBroken?: boolean;

  @JsonProperty()
  public offset?: number;

  @JsonProperty()
  public limit?: number;

  constructor(data: ICountries) {
    Object.assign(this, data);
  }
}

@JsonObject()
export class ICodecs {
  @JsonProperty()
  public order?: 'name' | 'stationcount';

  @JsonProperty()
  public reverse?: boolean;

  @JsonProperty({ name: 'hidebroken' })
  public hideBroken?: boolean;

  @JsonProperty()
  public offset?: number;

  @JsonProperty()
  public limit?: number;

  constructor(data: ICodecs) {
    Object.assign(this, data);
  }
}

@JsonObject()
export class IStates {
  @JsonProperty()
  public order?: 'name' | 'stationcount';

  @JsonProperty()
  public reverse?: boolean;

  @JsonProperty({ name: 'country' })
  public countryName?: string;

  @JsonProperty({ name: 'hidebroken' })
  public hideBroken?: boolean;

  @JsonProperty()
  public offset?: number;

  @JsonProperty()
  public limit?: number;

  constructor(data: IStates) {
    Object.assign(this, data);
  }
}

@JsonObject()
export class ILanguages {
  @JsonProperty()
  public order?: 'name' | 'stationcount';

  @JsonProperty()
  public reverse?: boolean;

  @JsonProperty({ name: 'hidebroken' })
  public hideBroken?: boolean;

  @JsonProperty()
  public offset?: number;

  @JsonProperty()
  public limit?: number;

  constructor(data: ILanguages) {
    Object.assign(this, data);
  }
}

@JsonObject()
export class ITags {
  @JsonProperty()
  public order?: 'name' | 'stationcount';

  @JsonProperty()
  public reverse?: boolean;

  @JsonProperty({ name: 'hidebroken' })
  public hideBroken?: boolean;

  @JsonProperty()
  public offset?: number;

  @JsonProperty()
  public limit?: number;

  constructor(data: ITags) {
    Object.assign(this, data);
  }
}

@JsonObject()
export class IStationChecks {
  @JsonProperty({ name: 'stationUUID' })
  public stationUUID?: string;

  @JsonProperty({ name: 'lastcheckuuid' })
  public lastCheckUUID?: string;

  @JsonProperty()
  public seconds?: number;

  @JsonProperty()
  public limit?: number;

  constructor(data: IStationChecks) {
    Object.assign(this, data);
  }
}

@JsonObject()
export class IStationClicks {
  @JsonProperty({ name: 'stationuuid' })
  public stationUUID?: string;

  @JsonProperty()
  public lastClickUUID?: string;

  @JsonProperty()
  public seconds?: number;

  constructor(data: IStationClicks) {
    Object.assign(this, data);
  }
}

@JsonObject()
export class IStationCheckSteps {
  @JsonProperty({ name: 'uuids', beforeSerialize: (value: string) => value.split(',') })
  public UUIDs: string[];

  constructor(data: IStationCheckSteps) {
    Object.assign(this, data);
  }
}

@JsonObject()
export class IStationOldVersion {
  @JsonProperty({ name: 'lastchangeuuid' })
  public lastChangeUUID?: string;

  @JsonProperty()
  public limit?: number;

  constructor(data: IStationOldVersion) {
    Object.assign(this, data);
  }
}
