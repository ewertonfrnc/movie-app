import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Home types
export type RootStackParamsList = {
  home: undefined;
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
  trending: undefined;
  showDetails: {
    showId: number;
    showType: string;
  };
};
