import { JsonProperty, JsonObject } from 'typescript-json-serializer';

@JsonObject()
export class Station {
  @JsonProperty({ name: 'changeuuid' })
  public changeUUID: string;

  @JsonProperty({ name: 'stationuuid' })
  public stationUUID: string;

  @JsonProperty({ name: 'serveruuid' })
  public serverUUID: string;

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

@JsonObject()
export class StationCheck {
  @JsonProperty({ name: 'checkuuid' })
  public checkUUID: string;

  @JsonProperty({ name: 'stationuuid' })
  public stationUUID: string;

  @JsonProperty()
  public source: string;

  @JsonProperty()
  public codec: string;

  @JsonProperty()
  public bitrate: number;

  @JsonProperty({ beforeDeserialize: (value: number) => Boolean(value) })
  public hls: boolean;

  @JsonProperty({ beforeDeserialize: (value: number) => Boolean(value) })
  public ok: boolean;

  @JsonProperty({ name: 'timestamp_iso8601' })
  public date: Date;

  @JsonProperty({ name: 'urlcache' })
  public urlCache: string;

  @JsonProperty({ name: 'metainfo_overrides_database', beforeDeserialize: (value: number) => Boolean(value) })
  public metainfoOverridesDatabase: boolean;

  @JsonProperty({ beforeDeserialize: (value: number | null) => (value !== null ? Boolean(value) : null) })
  public public: boolean | null;

  @JsonProperty()
  public name: string | null;

  @JsonProperty()
  public description: string | null;

  @JsonProperty({ beforeDeserialize: (value: string | null) => (value !== null ? value.split(',') : null) })
  public tags: string[] | null;

  @JsonProperty({ name: 'countrycode' })
  public countryCode: string | null;

  @JsonProperty({ name: 'countrysubdivisioncode' })
  public countrySubdivisionCode: string | null;

  @JsonProperty({ name: 'homepage' })
  public homepageUrl: string | null;

  @JsonProperty({ name: 'favicon' })
  public faviconUrl: string | null;

  @JsonProperty({ name: 'loadbalancer' })
  public loadBalancer: string | null;

  @JsonProperty({ name: 'server_software' })
  public serverSoftware: string | null;

  @JsonProperty()
  public sampling: number | null;

  @JsonProperty({ name: 'timing_ms' })
  public timingMs: number;

  @JsonProperty({ name: 'languagecodes', beforeDeserialize: (value: string | null) => (value !== null ? value.split(',') : null) })
  public languageCodes: string[] | null;

  @JsonProperty({ name: 'ssl_error', beforeDeserialize: (value: number) => Boolean(value) })
  public sslError: boolean;

  @JsonProperty({ name: 'geo_lat' })
  public geoLat: number | null;

  @JsonProperty({ name: 'geo_long' })
  public geoLong: number | null;
}

@JsonObject()
export class StationCheckStep {
  @JsonProperty({ name: 'stepuuid' })
  public stepUUID: string;

  @JsonProperty({ name: 'parent_stepuuid' })
  public parentStepUUID: string | null;

  @JsonProperty({ name: 'checkuuid' })
  public checkUUID: string;

  @JsonProperty({ name: 'stationuuid' })
  public stationUUID: string;

  @JsonProperty()
  public url: string;

  @JsonProperty({ name: 'urltype' })
  public urlType: 'STREAM' | 'REDIRECT' | 'PLAYLIST' | null;

  @JsonProperty()
  public error: string | null;

  @JsonProperty({ name: 'creation_ios8601' })
  public createdAt: Date;
}

@JsonObject()
export class ServerStats {
  @JsonProperty({ name: 'supported_version' })
  public supportedVersion: number;

  @JsonProperty({ name: 'software_version' })
  public softwareVersion: string;

  @JsonProperty()
  public status: string;

  @JsonProperty()
  public stations: number;

  @JsonProperty({ name: 'stations_broken' })
  public brokenStations: number;

  @JsonProperty()
  public tags: number;

  @JsonProperty({ name: 'clicks_last_hour' })
  public clicksLastHour: number;

  @JsonProperty({ name: 'clicks_last_day' })
  public clicksLastDay: number;

  @JsonProperty()
  public languages: number;

  @JsonProperty()
  public countries: number;
}

@JsonObject()
export class ServerConfig {
  @JsonProperty({ name: 'check_enabled' })
  public checkEnabled: boolean;

  @JsonProperty({ name: 'prometheus_exporter_enabled' })
  public prometheusExporterEnabled: boolean;

  @JsonProperty({ name: 'pull_servers' })
  public pullServers: string[];

  @JsonProperty({ name: 'tcp_timeout_seconds' })
  public tcpTimeoutSeconds: number;

  @JsonProperty({ name: 'broken_stations_never_working_timeout_seconds' })
  public brokenStationsNeverWorkingTimeoutSeconds: number;

  @JsonProperty({ name: 'broken_stations_timeout_seconds' })
  public brokenStationsTimeoutSeconds: number;

  @JsonProperty({ name: 'checks_timeout_seconds' })
  public checksTimeoutSeconds: number;

  @JsonProperty({ name: 'click_valid_timeout_seconds' })
  public clickValidTimeoutSeconds: number;

  @JsonProperty({ name: 'clicks_timeout_seconds' })
  public clicksTimeoutSeconds: number;

  @JsonProperty({ name: 'mirror_pull_interval_seconds' })
  public mirrorPullIntervalSeconds: number;

  @JsonProperty({ name: 'update_caches_interval_seconds' })
  public updateCachesIntervalSeconds: number;

  @JsonProperty({ name: 'server_name' })
  public serverName: string;

  @JsonProperty({ name: 'server_location' })
  public serverLocation: string;

  @JsonProperty({ name: 'server_country_code' })
  public serverCountryCode: string;

  @JsonProperty({ name: 'check_retries' })
  public checkRetries: number;

  @JsonProperty({ name: 'check_batchsize' })
  public checkBatchsize: number;

  @JsonProperty({ name: 'check_pause_seconds' })
  public checkPauseSeconds: number;

  @JsonProperty({ name: 'api_threads' })
  public apiThreads: number;

  @JsonProperty({ name: 'cache_type' })
  public cacheType: string;

  @JsonProperty({ name: 'cache_ttl' })
  public cacheTtl: number;

  @JsonProperty({ name: 'language_replace_filepath' })
  public languageReplaceFilepath: string;

  @JsonProperty({ name: 'language_to_code_filepath' })
  public languageToCodeFilepath: string;
}

@JsonObject()
export class StationOldVersion {
  @JsonProperty({ name: 'changeuuid' })
  public changeUUID: string;

  @JsonProperty({ name: 'stationuuid' })
  public stationUUID: string;

  @JsonProperty()
  public name: string;

  @JsonProperty()
  public url: string;

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

  @JsonProperty({ name: 'geo_lat' })
  public geoLat: number | null;

  @JsonProperty({ name: 'geo_long' })
  public geoLong: number | null;
}

@JsonObject()
export class StationClick {
  @JsonProperty({ name: 'stationuuid' })
  public stationUUID: string;

  @JsonProperty({ name: 'clickuuid' })
  public clickUUID: string;

  @JsonProperty({ name: 'clicktimestamp_iso8601' })
  public clickDate: Date;
}
