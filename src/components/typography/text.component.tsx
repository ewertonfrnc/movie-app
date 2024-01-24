import { StyleSheet, Text } from 'react-native';
import React, { ReactNode } from 'react';
import { theme } from '../../constants';

type TextComponentProps = {
  children: ReactNode;
  rank?: 'badRank' | 'goodRank' | 'awesomeRank';
  type: 'title' | 'body' | 'button' | 'caption';
};

export default function TextComponent({
  type,
  rank = '',
  children,
}: TextComponentProps) {
  return <Text style={[styles[type], styles[rank]]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: theme.COLORS.whiteSmoke,
    fontSize: theme.FONTS.size.title,
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
