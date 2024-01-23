import { FC, useEffect, useRef } from "react";
import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";

import { theme } from "../../../../constants";

type ProgressProps = {
  currentValue: number;
  totalValue: number;
};

const Progress: FC<ProgressProps> = ({ currentValue = 1, totalValue }) => {
  const { width } = useWindowDimensions();
  const value = useRef(new Animated.Value(currentValue)).current;

  useEffect(() => {
    const animation = Animated.timing(value, {
      toValue: (currentValue / totalValue) * (width < 400 ? 120 : 150),
      duration: 500,
      useNativeDriver: false,
    });

    animation.start();
  }, [currentValue]);

  console.log({ value, width });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.innerContainer, { width: value }]} />
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 10,
    backgroundColor: theme.COLORS.lightDark,
    borderRadius: theme.SIZES.xlg,
    overflow: "hidden",
  },
  innerContainer: {
    height: 10,
    backgroundColor: theme.COLORS.darkRed,
  },
});
