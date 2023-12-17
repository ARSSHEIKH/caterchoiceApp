import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ProgressBar, Text } from 'components';

interface RateItemProps {
  style?: ViewStyle;
  item: {
    star: number;
    rate: number;
  };
}

const RateItem: React.FC<RateItemProps> = ({ style, item }) => {
  const { star, rate } = item;
  return (
    <View style={styles.container}>
      <Text category="c4" marginRight={8}>
        {star}⭐
      </Text>
      <ProgressBar progress={rate} style={{ flex: 1 }} />
      <Text style={{ width: 24 }} marginLeft={8} category="c4">
        {(rate * 100).toFixed(0)}%
      </Text>
    </View>
  );
};

export default RateItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
