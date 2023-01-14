import React, {useState, useEffect} from 'react';
import {Text, ActivityIndicator, View} from 'react-native';
import {getMovieDetails} from '../services/services';

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

      <Text>{details && details.title}</Text>
    </>
  );
};

export default Details;
