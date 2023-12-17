import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'components';

import { Images } from 'assets/images';

const Frame: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: Images.image14 }} resizeMode="cover" />
      <View style={styles.content}>
        <Text category="h5">Your style!!!</Text>
        <Text marginTop={4} category="c2" status="body" center>
          {`Ead on some of the best\nfashion style out there.`}
        </Text>
      </View>
    </View>
  );
};

export default Frame;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 210,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
