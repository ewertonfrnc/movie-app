// Home types
import { SeasonDetails, TMDBMovie } from './show.interface';

export type RootStackParamsList = {
  home: undefined;
  search: undefined;
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
