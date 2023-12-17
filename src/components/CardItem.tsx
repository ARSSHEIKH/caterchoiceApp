import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useLayout } from 'hooks';

import Text from './Text';

import { Images } from 'assets/images';
import { CardFragment } from 'constants/types';

interface CardItemProps {
  style?: ViewStyle;
  item: CardFragment;
  onPress?(): void;
}

const CardItem: React.FC<CardItemProps> = ({ style, item, onPress }) => {
  const { name, image } = item;
  const { width } = useLayout();

  return (
    <ImageBackground style={[styles.container, { width: width - (16 + 56) }, style]} source={image}>
      <TouchableOpacity activeOpacity={0.7} style={styles.flexOne} onPress={onPress}>
        <Text category="b2" status="white" right>
          Debit
        </Text>
        <View style={styles.flexOne} />
        <Text category="h6" status="white">
          **** **** **** 0329
        </Text>
        <Text category="b2" status="white">
          {name}
        </Text>
        <View style={styles.row}>
          <View style={styles.row1}>
            <Text category="c3" status="white" marginRight={6}>
              {`VALID\nTHRU`}
            </Text>
            <Text category="c3" status="white">
              03/24
            </Text>
          </View>
          <Image source={Images.master} style={styles.master} />
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 192,
  },
  master: {
    width: 42,
    height: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  flexOne: {
    flex: 1,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
