// Home types
import { Episode, SeasonDetails, TMDBMovie } from './show.interface';

export type RootStackParamsList = {
  home: undefined;
  search: undefined;
  settings: undefined;
  showDetails: TMDBMovie;
  episodes: { seasonEpisodes: SeasonDetails };
  episodeDetails: { episode: Episode };
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
