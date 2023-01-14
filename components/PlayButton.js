import React from 'react';
import {Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class PlayButton extends React.PureComponent {
  render() {
    return (
      <>
        <Pressable>
          <Icon name={'caret-forward-outline'}></Icon>
        </Pressable>
      </>
    );
  }
}

export default PlayButton;
