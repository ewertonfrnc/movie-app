import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import SafeAreaComponent from '../../../components/utility/safe-area.component';
import TextComponent from '../../../components/typography/text.component';

import { theme } from '../../../constants';
import { getRecentlyWatchedEpisodes } from '../../../services/supabase/movie.service';
import moment from 'moment';

export default function HomeScreen() {
  const [recentlyActivity, setRecentlyActivity] = useState([]);
  async function fetchRecentlyWatchedShows() {
    const response = await getRecentlyWatchedEpisodes();
    setRecentlyActivity(response);
    console.log('response', response);
  }

  useEffect(() => {
    fetchRecentlyWatchedShows();
  }, []);

  return (
    <SafeAreaComponent>
      <ScrollView style={styles.container}>
        <View style={{ marginBottom: theme.SPACING.xxxlg }}>
          <TextComponent type="title">Atividade recente</TextComponent>

          {recentlyActivity.map((activity) => (
            <TextComponent key={activity.id} type={'body'}>
              {activity.showName}
              {moment(activity.created_at).format('LLL')}
            </TextComponent>
          ))}
        </View>

        <View>
          <TextComponent type="caption">A seguir</TextComponent>
          <TextComponent type="title">Continue assistindo</TextComponent>
        </View>
      </ScrollView>
    </SafeAreaComponent>
  );
}

const styles = StyleSheet.create({
  container: {},
});
