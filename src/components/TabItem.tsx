import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@ui-kitten/components';

import Text from './Text';

interface TabItemProps {
  style?: ViewStyle;
  title: string;
  isSelected: boolean;
  onPress?(): void;
}

const TabItem: React.FC<TabItemProps> = ({ style, title, isSelected, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container, style]} onPress={onPress}>
      <Text category="b2" status={isSelected ? 'basic' : 'sub'}>
        {title}
      </Text>
      <View
        style={[
          styles.dot,
          {
            backgroundColor: isSelected ? theme['color-primary-500'] : 'transparent',
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
    marginTop: 4,
  },
});
