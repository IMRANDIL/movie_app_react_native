import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'a1c48b8b61402cdd2902b7bf0b18ec16';

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/movie/upcoming?api_key=${apiKey}`,
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getPopularTV = async () => {
  try {
    const response = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
