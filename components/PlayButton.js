import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <>
        <Pressable style={styles.button} onPress={() => handlePress()}>
          <Icon name={'caret-forward-outline'} size={30} color={'white'} />
        </Pressable>
      </>
    );
  }
}

export default PlayButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: '#4481FC',
  },
});
