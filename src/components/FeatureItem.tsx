import React from 'react';
import { useTheme, Icon } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Text from './Text';

interface FeatureItemProps {
  title: string;
  is_last?: boolean;
  onPress?(): void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, is_last, onPress }) => {
  const theme = useTheme();
  const borderBottomColor = is_last ? 'transparent' : theme['background-basic-color-3'];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, { borderBottomColor }]}
      onPress={onPress}>
      <Text category="t1">{title}</Text>
      <Icon pack="assets" name="back" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default FeatureItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  icon: {
    transform: [{ rotate: '180deg' }],
  },
});
