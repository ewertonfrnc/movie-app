// Home types
import { TMDBMovie, SeasonDetails } from './show.interface';

export type RootStackParamsList = {
  home: undefined;
  settings: undefined;
  showDetails: TMDBMovie;
  episodes: {
    seriesId: number;
    season: SeasonDetails;
  };
};

// Overview types
export type HomeStackParamsList = {
  movies: undefined;
  settings: undefined;
};

// Account types
export type AccountStackParamsList = {
  login: undefined;
  register: undefined;
};
