import React from 'react';
import { BlurView } from '@react-native-community/blur';
import { StyleSheet, TouchableOpacity, ImageBackground, ViewStyle } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { useLayout } from 'hooks';

import Text from './Text';
import TimeItem from './TimeItem';

import { BlogFragment } from 'constants/types';

interface PostItemProps {
  style?: ViewStyle;
  item: BlogFragment;
  onPress?(): void;
}

const PostItem: React.FC<PostItemProps> = ({ style, item, onPress }) => {
  const theme = useTheme();
  const { width } = useLayout();
  const { image, title, time } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          width: width - (16 + 119),
          backgroundColor: theme['background-basic-color-3'],
        },
        style,
      ]}
      onPress={onPress}>
      <ImageBackground resizeMode="contain" source={{ uri: image }} style={styles.image}>
        <BlurView blurAmount={20} style={styles.box}>
          <Text category="b2" numberOfLines={2}>
            {title}
          </Text>
          <TimeItem time={time} marginTop={4} />
        </BlurView>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1 / 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  box: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    padding: 12,
  },
});
