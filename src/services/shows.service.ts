import { axiosInstance } from './index';

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

export const fetchMovieDetails = async (movieId: number) => {
  try {
    const { data } = await axiosInstance.get(`/movie/${movieId}?append_to_response=videos,images`, {
      params: { language: 'pt-BR' },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovieCredits = async (movieId: number) => {
  try {
    const { data: {cast} } = await axiosInstance.get(`/movie/${movieId}/credits`, {
      params: { language: 'pt-BR' },
    });

    return cast;
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
