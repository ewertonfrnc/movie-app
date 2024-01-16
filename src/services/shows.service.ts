import { axiosInstance } from './index';

// Show
export const fetchShowDetails = async (showId: number, mediaType: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/${
        mediaType === 'tv' ? 'tv' : 'movie'
      }/${showId}?append_to_response=videos,images`,
      { params: { language: 'pt-BR' } }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchShowCredits = async (showId: number, mediaType: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/${mediaType === 'tv' ? 'tv' : 'movie'}/${showId}/credits`,
      { params: { language: 'pt-BR' } }
    );

    return data.cast;
  } catch (error) {
    console.error(error);
  }
};

// Movies
export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axiosInstance.get('/trending/movie/week', {
      params: { language: 'pt-BR' },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
};

// TV Shows
export const fetchTrendingTvShows = async () => {
  try {
    const { data } = await axiosInstance.get('/trending/tv/week', {
      params: { language: 'pt-BR' },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
};

// Miscelaneous
export const fetchTrending = async () => {
  try {
    const { data } = await axiosInstance.get('/trending/all/week', {
      params: { language: 'pt-BR' },
    });
    return data.results;
  } catch (error) {
    console.error(error);
  }
};
