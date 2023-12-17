import React from 'react';
import { StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';

import Text from './Text';

interface TagItemProps {
  style?: ViewStyle;
  item: {
    title: string;
    color: string;
  };
  onPress?(): void;
}

const TagItem: React.FC<TagItemProps> = ({ style, item }) => {
  const { title, color } = item;

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: color }, style]}>
      <Text status="white" category="b4">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TagItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    height: 24,
    borderRadius: 24,
  },
});
