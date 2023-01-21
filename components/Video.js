import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const Video = ({videoShown}) => {
  return (
    <VideoPlayer
      onBack={() => videoShown()}
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
    />
  );
};

export default Video;
