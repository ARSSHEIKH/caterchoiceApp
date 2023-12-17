import React from 'react';
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { useLayout } from 'hooks';

import { MethodFragment } from 'constants/types';

interface MethodItemProps {
  style?: ViewStyle;
  item: MethodFragment;
  is_selected?: boolean;
  onPress?(): void;
}

const MethodItem: React.FC<MethodItemProps> = ({ style, item, is_selected, onPress }) => {
  const theme = useTheme();
  const { width } = useLayout();
  const borderColor = is_selected ? theme['color-primary-500'] : 'transparent';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, { width: (width - (80 + 16 * 3)) / 2, borderColor }, style]}>
      <Image resizeMode="contain" source={{ uri: item.image }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default MethodItem;

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
