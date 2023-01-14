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
import {Rating} from 'react-native-ratings';
const PlaceHolderImg = require('../assets/images/No-Image-Placeholder.svg.png');

const height = Dimensions.get('screen').height;

const Details = ({route}) => {
  const {movieId} = route.params;
  const [movieDetails, setMovieDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMovieDetails(movieId)
      .then(data => {
        setIsLoading(true);
        setMovieDetails(data);
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
      {movieDetails && (
        <ScrollView>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={
              movieDetails.poster_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
                  }
                : PlaceHolderImg
            }
          />
          <View style={styles.container}>
            <Text style={styles.movieTitle}>{movieDetails.title}</Text>
            {movieDetails.genres && (
              <View style={styles.generesContainer}>
                {movieDetails.genres.map((genre, i) => {
                  return (
                    <Text key={i} style={styles.genreText}>
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
            )}
            <Rating
              type="custom"
              startingValue={movieDetails.vote_average / 2}
              ratingCount={5}
              imageSize={30}
              readonly={true}
              ratingColor="black"
              style={styles.star}
            />
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
  generesContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
  },
  genreText: {
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  star: {
    marginVertical: 3,
  },
});
