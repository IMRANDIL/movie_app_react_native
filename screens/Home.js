import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
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
import Error from '../components/Error';

const diamensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getAllData = () => {
    setLoaded(true);
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
    setLoaded(true);
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
          setLoaded(false);
        },
      )
      .catch(error => {
        setLoaded(false);
        setError(true);
        console.log(error);
      });
  }, []);

  return (
    <>
      {loaded ? (
        <ActivityIndicator size={'large'} color="#0000ff" />
      ) : !error ? (
        <ScrollView>
          {movieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={movieImages}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={diamensions.height / 1.4}
                autoPlay={true}
                circleLoop={true}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List
                title={'Popular Movies'}
                navigation={navigation}
                content={popularMovies}></List>
            </View>
          )}
          {popularTv && (
            <View style={styles.carousel}>
              <List
                title={'Popular TV Shows'}
                navigation={navigation}
                content={popularTv}></List>
            </View>
          )}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                title={'Popular Family Movies'}
                navigation={navigation}
                content={familyMovies}></List>
            </View>
          )}
          {animatedMovies && (
            <View style={styles.carousel}>
              <List
                title={'Popular Animation Movies'}
                navigation={navigation}
                content={animatedMovies}></List>
            </View>
          )}

          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                title={'Popular Documentary Movies'}
                navigation={navigation}
                content={documentaryMovies}></List>
            </View>
          )}
        </ScrollView>
      ) : (
        <Error
          errorText1="Ooops! Something went wrong"
          errorText2="Please make sure you are online then restart the app"
        />
      )}
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
