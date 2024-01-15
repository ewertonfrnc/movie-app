import { axiosInstance } from './index';

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
