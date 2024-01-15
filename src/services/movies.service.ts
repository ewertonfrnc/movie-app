import { axiosInstance } from '../services/index';

export const fetchPopularMovies = async () => {
  try {
    const response = await axiosInstance.get('/movie/popular');
    console.log('response', response);
  } catch (error) {
    console.error(error);
  }
};
