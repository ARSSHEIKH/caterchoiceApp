import React from 'react';
import { Text } from 'components';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useLayout } from 'hooks';

import { Images } from 'assets/images';
import { Button } from '@ui-kitten/components';

interface BannerProductGridProps {
  item?: any;
  onPress?(): void;
}

const BannerProductGrid: React.FC<BannerProductGridProps> = ({ onPress }) => {
  const { width } = useLayout();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, { width: width }]}
      onPress={onPress}>
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        source={{ uri: Images.hot_summer_1 }}>
        <View style={styles.content}>
          <Text category="h5" marginTop={32} marginHorizontal={12}>
            New Arrival
          </Text>
          <Text category="c1" status="content" opacity={0.5} marginHorizontal={12}>
            For summer collection
          </Text>
          <Button children="Shop now" size="tiny" style={styles.button} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default BannerProductGrid;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 186,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {},
  button: {
    marginTop: 12,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
});
