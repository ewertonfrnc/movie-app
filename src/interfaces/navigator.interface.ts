// Home types
import { Episode, SeasonDetails, TMDBShow } from './show.interface';

export type RootStackParamsList = {
  home: undefined;
  search: undefined;
  settings: undefined;
  showDetails: TMDBShow;
  episodes: {
    seasonEpisodes: SeasonDetails;
    watchedEpisodes: Array<{
      episodeId: number;
      seasonNumber: number;
      userId: string;
    }>;
  };
  episodeDetails: {
    episode: Episode;
  };
};

// Overview types
export type HomeStackParamsList = {
  activity: undefined;
  movies: undefined;
  settings: undefined;
};

// Account types
export type AccountStackParamsList = {
  login: undefined;
  register: undefined;
};
