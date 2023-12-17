import React from 'react';
import { Icon } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

import Text from './Text';

interface TimeItemProps {
  time: string;
  marginTop?: number;
  marginLeft?: number;
}

const TimeItem: React.FC<TimeItemProps> = ({ time, marginTop, marginLeft }) => {
  return (
    <View style={[styles.container, { marginTop, marginLeft }]}>
      <Icon pack="assets" name="clock" style={styles.icon} />
      <Text marginLeft={4} category="c2" status="placeholder">
        {time}
      </Text>
    </View>
  );
};

export default TimeItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
  },
});
