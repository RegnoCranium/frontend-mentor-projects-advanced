type NativeName = {
  common: string;
  official: string;
};

type Currency = {
  name: string;
  symbol: string;
};

type Flags = {
  png: string;
  svg: string;
  alt?: string;
};

export type CountryHome = {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, NativeName>;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: Flags;
  cca3: string;
  ccn3: string;
};

export type CountryDetailData = CountryHome & {
  subregion: string;
  tld?: string[];
  currencies: Record<string, Currency>;
  languages: Record<string, string>;
  borders?: string[];
};

export type BorderCountry = {
  name: {
    common: string;
  };
  cca3: string;
  ccn3: string;
};

export type CountryCardProps = {
  country: CountryHome;
};
