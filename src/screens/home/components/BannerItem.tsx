import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, View } from 'react-native';
import { Button } from '@ui-kitten/components';
import { banner_uri } from "constants/common"
import FastImage from 'react-native-fast-image';
import { Text } from 'components';

import { BannerSpec } from 'constants/types';

interface BannerItemProps {
  item: BannerSpec;
  onPress?(): void;
}

const BannerItem = ({ item, onPress }: BannerItemProps) => {
  const { title, description, button, image } = item;


  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress}>
      <FastImage style={styles.image} source={{ uri: image }}>
        <View style={styles.content}>
          {/* <Text category="h4" marginTop={16}>
            {title}
          </Text> */}
          {/* {description && <Text status="content">{description}</Text>} */}
          {/* {button && <Button {...button} />} */}
        </View>
      </FastImage>
    </TouchableOpacity>
  );
};

export default BannerItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 16,
  },
});
