import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme, Avatar } from '@ui-kitten/components';

import Text from './Text';
import TimeItem from './TimeItem';

import { ReviewFragment } from 'constants/types';

interface ReviewItemProps {
  style?: ViewStyle;
  item: ReviewFragment;
  onPress?(): void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ style, item, onPress }) => {
  const theme = useTheme();
  const { User, rate, review, time } = item;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.container, style]}>
      <Avatar size="48" source={{ uri: User?.avatar }} />
      <View style={[styles.content, { borderBottomColor: theme['background-basic-color-3'] }]}>
        <View style={styles.top}>
          <Text category="t1">{User?.name}</Text>
          <Text category="b2">{rate}⭐</Text>
        </View>
        <Text marginTop={16} category="b3">
          {review}
        </Text>
        <TimeItem time={time || ''} marginTop={16} />
      </View>
    </TouchableOpacity>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingRight: 16,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
