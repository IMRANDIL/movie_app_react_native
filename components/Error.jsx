import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
const offlineImg = require('../assets/images/offline1.jpg');

class Error extends React.PureComponent {
  render() {
    const {errorText1, errorText2} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errorText1}</Text>
        <Image
          style={{
            resizeMode: 'center',
            width: 500,
            height: 500,
            borderRadius: 20,
          }}
          source={offlineImg}
        />
        <Text style={styles.text}>{errorText2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'firebrick',
  },
});

export default Error;
