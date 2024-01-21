// Home types
export type RootStackParamsList = {
  home: undefined;
  settings: undefined;
};

// Overview types
export type HomeStackParamsList = {
  movies: undefined;
  showDetails: {
    showId: number;
    showType: string;
  };
};

// Account types
export type AccountStackParamsList = {
  login: undefined;
  register: undefined;
};
