import React from 'react';
import {Text, ActivityIndicator, View} from 'react-native';

const Details = ({route}) => {
  const {movieDetail} = route.params;
  return (
    <>
      {!movieDetail && <ActivityIndicator size="large" color="#0000ff" />}

      <Text>{movieDetail.title}</Text>
    </>
  );
};

export default Details;
