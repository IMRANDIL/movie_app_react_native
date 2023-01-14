import React from 'react';
import {Text} from 'react-native';

const Details = ({route}) => {
  const {movieDetail} = route.params;
  return (
    <>
      <Text>{movieDetail.title}</Text>
    </>
  );
};

export default Details;
