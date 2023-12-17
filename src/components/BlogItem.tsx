import React from 'react';
import { View, Image, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '@ui-kitten/components';

import Text from './Text';
import TimeItem from './TimeItem';

import { BlogFragment } from 'constants/types';

interface BlogItemProps {
  style?: ViewStyle;
  item: BlogFragment;
  onPress?(): void;
}

const BlogItem: React.FC<BlogItemProps> = ({ style, item, onPress }) => {
  const theme = useTheme();
  const { image, title, time } = item;
  const borderBottomColor = theme['background-basic-color-4'];

  return (
    <TouchableOpacity
      style={[styles.container, { borderBottomColor }, style]}
      activeOpacity={0.7}
      onPress={onPress}>
      <View style={styles.imageView}>
        <Image resizeMode="contain" source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.flex}>
        <Text category="t1" marginBottom={8}>
          {title}
        </Text>
        <TimeItem time={time} />
      </View>
    </TouchableOpacity>
  );
};

export default BlogItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  imageView: {
    aspectRatio: 1 / 1,
    width: 80,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1,
    paddingRight: 16,
  },
});
