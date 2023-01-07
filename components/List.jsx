import React from 'react';
import {View, FlatList, Text} from 'react-native';
class List extends React.PureComponent {
  render() {
    const {title, content} = this.props;
    return (
      <View>
        <View>
          <Text>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => <Text>{item.title}</Text>}
          />
        </View>
      </View>
    );
  }
}

export default List;
