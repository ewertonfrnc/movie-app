import { axiosInstance } from '../services/index';

export const fetchPopularMovies = async () => {
  try {
    const { data } = await axiosInstance.get('/movie/now_playing', {
      params: { language: 'pt-BR' },
    });

    return data.results;
  } catch (error) {
    console.error(error);
  }
};
