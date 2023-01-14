import React, {useState, useEffect} from 'react';
import {
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import {getMovieDetails} from '../services/services';
const PlaceHolderImg = require('../assets/images/No-Image-Placeholder.svg.png');

const height = Dimensions.get('screen').height;

const Details = ({route}) => {
  const {movieId} = route.params;
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMovieDetails(movieId)
      .then(data => {
        setIsLoading(true);
        setDetails(data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  }, [movieId]);

  return (
    <>
      {!movieId && isLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      {details && (
        <ScrollView>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={
              details.poster_path
                ? {uri: `https://image.tmdb.org/t/p/w500${details.poster_path}`}
                : PlaceHolderImg
            }
          />
          <View style={styles.container}>
            <Text style={styles.movieTitle}>{details.title}</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  image: {
    height: height / 2,
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
