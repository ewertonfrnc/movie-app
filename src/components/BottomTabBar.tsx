import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '../constants';

type Tab = {
  label: string;
  type: string;
  activeIcon: string;
  inActiveIcon: string;
};

const TABS: Tab[] = [
  {
    label: 'Progresso',
    type: 'ionicons',
    activeIcon: 'tv',
    inActiveIcon: 'tv-outline',
  },
  {
    label: 'Explorar',
    type: 'material',
    activeIcon: 'star-four-points',
    inActiveIcon: 'star-four-points-outline',
  },
  {
    label: 'Conta',
    type: 'ionicons',
    activeIcon: 'person-circle',
    inActiveIcon: 'person-circle-outline',
  },
];

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.navigatorContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = TABS[index].label;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            {TABS[index].type === 'ionicons' ? (
              <Ionicons
                // @ts-ignore
                name={
                  isFocused ? TABS[index].activeIcon : TABS[index].inActiveIcon
                }
                size={24}
                color={isFocused ? theme.COLORS.white : theme.COLORS.silver}
              />
            ) : (
              <MaterialCommunityIcons
                // @ts-ignore
                name={
                  isFocused ? TABS[index].activeIcon : TABS[index].inActiveIcon
                }
                size={24}
                color={isFocused ? theme.COLORS.white : theme.COLORS.silver}
              />
            )}

            <Text
              style={{
                color: isFocused ? theme.COLORS.white : theme.COLORS.silver,
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: theme.SIZES.md,
    position: 'absolute',
    bottom: theme.SIZES.md,
    left: theme.SIZES.md,
    right: theme.SIZES.md,
    backgroundColor: theme.COLORS.lightDark,
    borderColor: theme.COLORS.lightDark,
  },
});
