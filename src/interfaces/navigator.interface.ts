// Home types
export type RootStackParamsList = {
  home: undefined;
  settings: undefined;
  showDetails: {
    showId: number;
    showType: string;
  };
  episodes: {
    seriesId: number;
    seasonNumber: number;
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
