import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme, Layout } from '@ui-kitten/components';

import Text from './Text';

interface SizeItemProps {
  style?: ViewStyle;
  size: string;
  sizeSelected: string;
  onPress?(): void;
  status?: 'primary' | 'basic';
}

const SizeItem: React.FC<SizeItemProps> = ({
  style,
  size,
  sizeSelected,
  onPress,
  status = 'primary',
}) => {
  const theme = useTheme();
  const borderColor =
    size === sizeSelected ? theme['background-basic-color-6'] : theme['background-basic-color-4'];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          borderColor,
          width: status === 'basic' ? 32 : 48,
          height: status === 'basic' ? 32 : 48,
        },
        style,
      ]}
      onPress={onPress}>
      <Layout
        level="10"
        style={[
          styles.content,
          {
            width: status === 'basic' ? 26 : 48,
            height: status === 'basic' ? 26 : 48,
          },
        ]}>
        <Text
          category={status === 'basic' ? 'c3' : 'h6'}
          uppercase
          status={size === sizeSelected ? 'basic' : 'sub'}>
          {size}
        </Text>
      </Layout>
    </TouchableOpacity>
  );
};

export default SizeItem;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 48,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 42,
    height: 42,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
