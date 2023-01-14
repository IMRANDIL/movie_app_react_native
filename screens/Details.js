import React, {useState, useEffect} from 'react';
import VideoPlayer from 'react-native-video-controls';
import {
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Modal,
  Pressable,
} from 'react-native';
import {getMovieDetails} from '../services/services';
import {Rating} from 'react-native-ratings';
const PlaceHolderImg = require('../assets/images/No-Image-Placeholder.svg.png');
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
const height = Dimensions.get('screen').height;

const Details = ({route, navigation}) => {
  const {movieId} = route.params;
  const [movieDetails, setMovieDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {!movieId && isLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      {movieDetails && (
        <View>
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
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
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
                imageSize={25}
                readonly={true}
                ratingColor="gold"
                style={styles.star}
              />
              <Text style={styles.overview}>{movieDetails.overview}</Text>
              <Text style={styles.releasedate}>{`Release date: ${dateFormat(
                movieDetails.release_date,
                'mmmm dS, yyyy',
              )}`}</Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              <VideoPlayer
                onBack={() => videoShown()}
                navigator={navigation}
                source={{
                  uri: 'https://www.youtube.com/watch?v=7OGjbjGmOh0',
                }}
              />

              {/* <Pressable onPress={() => videoShown()}>
                <Text>Close</Text>
              </Pressable> */}
            </View>
          </Modal>
        </View>
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
    marginVertical: 5,
  },
  overview: {
    padding: 15,
  },
  releasedate: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
