import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SafeAreaComponent from '../../../components/utility/safe-area.component';
import Input from '../../../components/Input.component';
import {
  fetchShowDetails,
  searchShows,
} from '../../../services/tmdb/shows.service';
import { TMDBMovie } from '../../../interfaces/show.interface';
import ImageCard from '../../../components/image-card.component';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../interfaces/navigator.interface';
import { theme } from '../../../constants';

type SearchScreenProps = {} & StackScreenProps<RootStackParamsList, 'search'>;

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [searchValue, setSearchValue] = useState('');
  const [movieResults, setMovieResults] = useState<TMDBMovie[]>([]);

  function debounce(func: Function, delay: number) {
    let timeout: string | number | NodeJS.Timeout | undefined;

    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const handleInputChange = debounce(async () => {
    const showsFound = await searchShows(searchValue);
    setMovieResults(showsFound);
  }, 500);

  function onChangeHandler(enteredText: string) {
    setSearchValue(enteredText);
    handleInputChange(enteredText);
  }

  async function goToShowScreen(showId: number, showType: string) {
    const selectedShow = await fetchShowDetails(showId, showType);

    if (selectedShow) {
      navigation.navigate('showDetails', selectedShow);
    }
  }

  return (
    <SafeAreaComponent>
      <View style={styles.container}>
        <Input
          textInputConfig={{
            placeholder: 'Procurar',
            value: searchValue,
            onChangeText: onChangeHandler,
          }}
        />

        <FlatList
          data={movieResults}
          renderItem={({ item }) => (
            <ImageCard
              type="small"
              show={item}
              onPress={() => goToShowScreen(item.id, item.media_type)}
            />
          )}
          numColumns={3}
        />
      </View>
    </SafeAreaComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SPACING.xlg,
    justifyContent: 'center',
  },
});
