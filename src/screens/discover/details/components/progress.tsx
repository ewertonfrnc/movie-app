import { FC } from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "../../../../constants";

type ProgressProps = {
  currentValue: number;
  totalValue: number;
};

const Progress: FC<ProgressProps> = ({ currentValue, totalValue }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          { width: `${(currentValue / totalValue) * 100}%` },
        ]}
      ></View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    height: 10,
    backgroundColor: theme.COLORS.lightDark,
    borderRadius: theme.SIZES.xlg,
    overflow: "hidden",
  },
  innerContainer: {
    width: "50%",
    height: 10,
    backgroundColor: theme.COLORS.darkRed,
  },
});
