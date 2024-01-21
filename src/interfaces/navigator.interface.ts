import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

// Home types
export type RootStackParamsList = {
  home: undefined;
  tvshows: undefined;
  settings: undefined;
};

export type CreateScreenOptionsProps =
  BottomTabScreenProps<RootStackParamsList>;
export type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

// Overview types
export type HomeStackParamsList = {
  movies: undefined;
  tvshows: undefined;
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
