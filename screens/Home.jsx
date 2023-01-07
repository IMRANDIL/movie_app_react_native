import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {getPopularMovies, getUpcomingMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';

const Home = () => {
  const [movieImages, setMovieImages] = useState([]);
  useEffect(() => {
    getUpcomingMovies()
      .then(movie => {
        const imageArray = [];
        movie &&
          movie.forEach(item => {
            imageArray.push(item.poster_path);
          });

        setMovieImages(imageArray);
        console.log(movieImages);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SliderBox images={movieImages} />
    </View>
  );
};

export default Home;
