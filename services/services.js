import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '';

const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getPopularTV = async () => {
  try {
    const response = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
