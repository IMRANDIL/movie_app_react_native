import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import {
  getAnimatedMovie,
  getDocumentaryMovie,
  getFamilyMovie,
  getPopularMovies,
  getPopularTV,
  getUpcomingMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const diamensions = Dimensions.get('screen');

const Home = () => {
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);

  const getAllData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularTV(),
      getAnimatedMovie(),
      getDocumentaryMovie(),
      getFamilyMovie(),
      getPopularMovies(),
    ]);
  };

  useEffect(() => {
    getAllData()
      .then(
        ([
          upcomingMovies,
          popularTvs,
          animatedMovies,
          DocumentedMovies,
          familyMovies,
          popularMovies,
        ]) => {
          const imageArray = [];

          upcomingMovies &&
            upcomingMovies.forEach(item => {
              imageArray.push(
                `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              );
            });

          setMovieImages(imageArray);
          setPopularMovies(popularMovies);
          setPopularTv(popularTvs);
          setFamilyMovies(familyMovies);
          setAnimatedMovies(animatedMovies);
          setDocumentaryMovies(DocumentedMovies);
        },
      )
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <ScrollView>
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
          <List title={'Popular Movies'} content={popularMovies}></List>
        </View>
        <View style={styles.carousel}>
          <List title={'Popular TV Shows'} content={popularTv}></List>
        </View>
        <View style={styles.carousel}>
          <List title={'Popular Family Movies'} content={familyMovies}></List>
        </View>
        <View style={styles.carousel}>
          <List
            title={'Popular Animation Movies'}
            content={animatedMovies}></List>
        </View>

        <View style={styles.carousel}>
          <List
            title={'Popular Documentary Movies'}
            content={documentaryMovies}></List>
        </View>
      </ScrollView>
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
