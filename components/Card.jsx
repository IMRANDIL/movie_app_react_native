import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
const PlaceHolderImg = require('../assets/images/No-Image-Placeholder.svg.png');
class Card extends React.PureComponent {
  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={
            item.poster_path
              ? {uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}
              : PlaceHolderImg
          }
        />
        {!item.poster_path && <Text>{item.title}</Text>}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
});
export default Card;
