import { api } from '../index';
import { SeasonDetails, TMDBMovie } from '../../interfaces/show.interface';

// ALL
export async function fetchTrendingShows() {
  try {
    const { data } = await api.get('/trending/all/day', {
      params: { language: 'pt-BR' },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
}

// Movies
export async function fetchTrendingMovies() {
  try {
    const { data } = await api.get('/trending/movie/day', {
      params: { language: 'pt-BR' },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchNowPlayingMovies() {
  try {
    const { data } = await api.get('/movie/now_playing', {
      params: { language: 'pt-BR' },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUpcomingMovies() {
  try {
    const { data } = await api.get('/movie/upcoming', {
      params: { language: 'pt-BR', region: 'br' },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
}

// Tv Shows
export async function fetchTrendingTvShows() {
  try {
    const { data } = await api.get('/trending/tv/day', {
      params: { language: 'pt-BR' },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchShowDetails(showId: number, mediaType: string) {
  try {
    const { data } = await api.get<TMDBMovie>(
      `/${
        mediaType === 'tv' ? 'tv' : 'movie'
      }/${showId}?append_to_response=videos,images,credits`,
      { params: { language: 'pt-BR' } },
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchShowSeasonDetails(
  seriesId: number,
  seasonNumber: number,
): Promise<SeasonDetails | undefined> {
  try {
    const { data } = await api.get(`/tv/${seriesId}/season/${seasonNumber}`, {
      params: { language: 'pt-BR' },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchEpisodeDetails(
  seriesId: number,
  seasonNumber: number,
  episodeNumber: number,
): Promise<SeasonDetails | undefined> {
  try {
    const { data } = await api.get(
      `/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
      {
        params: { language: 'pt-BR' },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}

// SEARCH
export async function searchShows(searchValue: string) {
  console.log('searchValue', searchValue);
  try {
    const { data } = await api.get('/search/multi', {
      params: {
        query: searchValue,
        include_adult: true,
        language: 'pt-BR',
      },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
}

// GENRES
export async function fetchMovieGenres() {
  try {
    const { data } = await api.get('genre/movie/list', {
      params: { language: 'pt-BR' },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}
