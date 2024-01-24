import React, { FC } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../../../interfaces/navigator.interface';
import { SeasonDetails } from '../../../../interfaces/show.interface';

import SafeAreaComponent from '../../../../components/utility/safe-area.component';
import CastAvatar from '../components/cast-avatar.component';
import ShowHeader from '../components/header.component';
import { ShowDescription } from '../components/show-description.component';
import SectionContainer from '../components/section.component';
import TextComponent from '../../../../components/typography/text.component';
import { theme } from '../../../../constants';

type ShowScreenProps = {} & NativeStackScreenProps<
  RootStackParamsList,
  'showDetails'
>;

const ShowScreen: FC<ShowScreenProps> = ({ navigation, route }) => {
  const movieDetails = route.params;
  function goToEpisodesScreen(season: SeasonDetails) {
    navigation.navigate('episodes', {
      seriesId: movieDetails.id,
      season,
    });
  }

  return (
    <SafeAreaComponent>
      <ScrollView>
        <ShowHeader
          title={movieDetails.title || movieDetails.name}
          tagline={movieDetails.tagline}
          backdrop_path={movieDetails.backdrop_path}
          poster_path={movieDetails.poster_path}
        />

        <ShowDescription
          releaseDate={movieDetails.release_date || movieDetails.first_air_date}
          runtime={movieDetails.runtime}
          mediaType={movieDetails.media_type}
          voteAverage={movieDetails.vote_average}
          genre={movieDetails.genres[0].name}
        />

        <SectionContainer title="Sinopse">
          <View>
            <TextComponent type={'body'}>{movieDetails.overview}</TextComponent>
          </View>
        </SectionContainer>

        <SectionContainer title="Elenco principal">
          <View style={styles.avatarContainer}>
            <FlatList
              data={movieDetails.credits.cast}
              renderItem={({ item }) => <CastAvatar castMember={item} />}
              horizontal
            />
          </View>
        </SectionContainer>
      </ScrollView>
    </SafeAreaComponent>
  );
};

export default ShowScreen;

const styles = StyleSheet.create({
  avatarContainer: {
    marginBottom: theme.SPACING.xxxlg,
    marginTop: theme.SPACING.lg,
  },
});
