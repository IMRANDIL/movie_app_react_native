import React, {useState, useEffect} from 'react';
import {
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {getMovieDetails} from '../services/services';
const PlaceHolderImg = require('../assets/images/No-Image-Placeholder.svg.png');

const Details = ({route}) => {
  const {movieDetail} = route.params;
  const movieId = movieDetail.id;
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
      {!movieDetail && isLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      {details && (
        <ScrollView>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={
              details.poster_path
                ? {uri: `https://image.tmdb.org/t/p/w500${details.poster_path}`}
                : PlaceHolderImg
            }
          />
        </ScrollView>
      )}
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    borderRadius: 20,
  },
});
