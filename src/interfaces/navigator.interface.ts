import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamsList = {
  home: undefined;
  settings: undefined;
};

export type CreateScreenOptionsProps = BottomTabScreenProps<RootStackParamsList>;
export type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};
