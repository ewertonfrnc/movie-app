import { StyleSheet, Text, TextProps } from 'react-native';
import React, { ReactNode } from 'react';
import { theme } from '../../constants';

type TextComponentProps = {
  children: ReactNode;
  rank?: 'badRank' | 'goodRank' | 'awesomeRank';
  type: 'title' | 'subtitle' | 'body' | 'button' | 'caption';
  textProps?: TextProps;
};

export default function TextComponent({
  type,
  rank = '',
  children,
  textProps,
}: TextComponentProps) {
  return (
    <Text
      style={[
        styles[type],
        styles[rank],
        { flex: textProps?.numberOfLines && 1 },
      ]}
      {...textProps}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: theme.COLORS.whiteSmoke,
    fontSize: theme.SIZES.lg,
  },
  subtitle: {
    fontWeight: 'bold',
    color: theme.COLORS.whiteSmoke,
    fontSize: theme.SIZES.xmd,
  },
  body: {
    color: theme.COLORS.whiteSmoke,
    fontSize: theme.FONTS.size.body,
  },
  button: {
    color: theme.COLORS.whiteSmoke,
    fontSize: theme.FONTS.size.button,
  },
  caption: {
    color: theme.COLORS.whiteSmoke,
    fontSize: theme.FONTS.size.caption,
  },
  badRank: {
    fontWeight: 'bold',
    color: theme.COLORS.ranks.bad,
  },
  goodRank: {
    fontWeight: 'bold',
    color: theme.COLORS.ranks.regular,
  },
  awesomeRank: {
    fontWeight: 'bold',
    color: theme.COLORS.ranks.good,
  },
});
