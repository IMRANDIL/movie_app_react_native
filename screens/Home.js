import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, FlatList, Text} from 'react-native';
import {getPopularMovies, getUpcomingMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const diamensions = Dimensions.get('screen');

const Home = () => {
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  useEffect(() => {
    getUpcomingMovies()
      .then(movies => {
        const imageArray = [];

        movies &&
          movies.forEach(item => {
            imageArray.push(
              `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            );
          });

        setMovieImages(imageArray);
      })
      .catch(error => console.log(error));

    getPopularMovies()
      .then(movies => {
        setPopularMovies(movies);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <View style={styles.sliderContainer}>
        <SliderBox
          images={movieImages}
          dotStyle={styles.sliderStyle}
          sliderBoxHeight={diamensions.height / 1.5}
          autoPlay={true}
          circleLoop={true}
        />
      </View>

      <View style={styles.carousel}>
        <List title={'z'} content={popularMovies}></List>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
