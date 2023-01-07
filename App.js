import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Home from './screens/Home';

const App = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Home />
    </View>
  );
};
export default App;
