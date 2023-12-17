import React from 'react';
import { Text } from 'components';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useLayout } from 'hooks';

import { Images } from 'assets/images';

interface BannerCategoriesProps {
  item?: any;
  onPress?(): void;
}

const BannerCategories: React.FC<BannerCategoriesProps> = ({ onPress }) => {
  const { width } = useLayout();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, { width: width - (119 + 16 * 2) }]}
      onPress={onPress}>
      <ImageBackground style={styles.image} source={{ uri: Images.banner }}>
        <View style={styles.content}>
          <Text category="c1" marginTop={16} marginHorizontal={12}>
            {'Valentine’s Day\nFor Gift'}
          </Text>
          <Text category="c5" marginTop={4} status="content" opacity={0.5} marginHorizontal={12}>
            For summer collection
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default BannerCategories;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {},
});
