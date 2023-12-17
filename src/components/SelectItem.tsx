import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@ui-kitten/components';

import Text from './Text';

interface SelectItemProps {
  title: string;
  onPress?(): void;
  is_last?: boolean;
}

const SelectItem: React.FC<SelectItemProps> = ({ title, is_last = false, onPress }) => {
  const theme = useTheme();

  const borderBottomColor = is_last ? 'transparent' : theme['background-basic-color-5'];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, { borderBottomColor }]}
      onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
});
