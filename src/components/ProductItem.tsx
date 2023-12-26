import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, Icon, Layout } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import Text from './Text';
import Skeleton from './Skeleton';

import { ProductFragment } from 'constants/types';
import { cdn, currency } from "constants/common";


interface ProductItemProps {
  style?: ViewStyle;
  item: ProductFragment;
  onPress?(): void;
}

const ProductItem = ({ item, style, onPress }: ProductItemProps) => {
  const { image, name, tags, price, price_sale, is_sale, is_favourite, p_price } = item;
  const images = image?.split(',');

  console.log('====================================');
  console.log("images", images);
  console.log('====================================');

  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          borderColor: theme['background-basic-color-10'],
          backgroundColor: theme['background-basic-color-1'],
        },
        style,
      ]}
      onPress={onPress}>
      <Layout level="8" style={styles.imageView}>
        {!!images && <FastImage resizeMode="cover" style={styles.image} source={{ uri: images[0] }} />}
      </Layout>
      <View style={styles.tagView}>
        {tags?.map((i, idx) => {
          return (
            <Text category="c4" status="body" marginRight={4} key={idx}>
              #{i}
            </Text>
          );
        })}
      </View>
      <Text category="b3" marginTop={4} marginHorizontal={16} numberOfLines={2}>
        {name}
      </Text>
      <View style={styles.priceView}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems:"center", width:"100%" }} >
          <Text category="b2">Single</Text>
          <Text category="b2" marginLeft={4} marginTop={0}>
            {currency}{price}
          </Text>
        </View>
      </View>
      <View style={[styles.priceView, {marginTop:5}]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems:"center", width:"100%" }} >

          <Text category="b2">Pack</Text>
          <Text category="b2" marginLeft={4} marginTop={0}>
            {currency}{p_price}
          </Text>
        </View>

      </View>
      <View style={styles.top}>
        {is_sale && (
          <View style={[styles.sale, { backgroundColor: theme['color-secondary-07'] }]}>
            <Text category="c4" status="white">
              {t('sale')}
            </Text>
          </View>
        )}
        <TouchableOpacity activeOpacity={0.7} style={styles.favorite}>
          <Icon
            name="heart"
            pack="assets"
            style={[styles.icon, { tintColor: is_favourite ? "#ce1212" : theme['background-basic-color-6'] }]}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const Loading = ({ style }: { style?: ViewStyle }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { borderColor: theme['background-basic-color-10'] }, style]}>
      <View style={{ aspectRatio: 1 / 1, borderRadius: 8, overflow: 'hidden' }}>
        <Skeleton width="100%" height="100%" variant="box" />
      </View>
      <View style={styles.tagLoading}>
        <Skeleton width="60%" height={12} />
      </View>
      <View style={styles.name}>
        <Skeleton width="80%" height={18} />
      </View>
      <View style={styles.name}>
        <Skeleton width="90%" height={18} />
      </View>
      <View style={styles.priceLoading}>
        <Skeleton width="100%" height={18} />
      </View>
    </View>
  );
};

ProductItem.Loading = Loading;

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    paddingBottom: 16,
    minHeight: 285,
  },
  imageView: {
    borderRadius: 8,
    overflow: 'hidden',
    aspectRatio: 1 / 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 16,
  },
  tagLoading: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  name: {
    marginTop: 4,
    marginHorizontal: 16,
  },
  priceLoading: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  top: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sale: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 24,
    position: 'absolute',
    left: 0,
  },
  favorite: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF50',
  },
  icon: {
    width: 12,
    height: 12,
  },
});
