import { CountryCode, QueryType } from ".";

export interface IQueryType {
  queryType: QueryType;
}

export interface GetByCityId extends IQueryType {
  cityId?: number;
}

export interface GetByCityName extends IQueryType {
  location?: {
    cityName?: string;
    state?: string;
    countryCode?: CountryCode;
  };
}

export interface GetByCityNameChild {
  cityName?: string;
  state?: string;
  countryCode?: CountryCode;
}

export interface GetByGeoCoordinates extends IQueryType {
  latitude?: number;
  longitude?: number;
}

export interface SetCurrentWeatherByCityName {
  cityName: string;
  state?: string;
  countryCode?: CountryCode;
}
