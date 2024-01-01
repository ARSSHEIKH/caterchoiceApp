import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import Text from './Text';
import Skeleton from './Skeleton';
import FastImage from 'react-native-fast-image';

import SvgSale from 'assets/svgs/SvgSale';
import { ProductFragment } from 'constants/types';
import { cdn, currency } from "constants/common";
import { fetchWishlist, setWishItems } from 'store/slices/wishlistSlice';
import { fetchFeatured, setFavourite } from 'store/slices/productSlice';
import { useRoute, useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/store';
import { userSelector } from 'store/slices/userSlice';
import { Icon } from '@ui-kitten/components';


interface ProductHorizontalProps {
  style?: ViewStyle;
  item: ProductFragment;
  type?: 'SINGLE' | 'CASE'
  onPress?(): void;
}

const ProductHorizontal = ({ item, style, onPress, type }: ProductHorizontalProps) => {
  const { image, name, tags, price, price_sale, is_sale, p_price, is_wishlist, slug } = item;
  const images = image?.split(',');

  const { name: routeName } = useRoute()
  const dispatch = useDispatch()
  const { user } = useAppSelector(userSelector);
  const theme = useTheme();

  const handleFavourite = async () => {
    const response = await dispatch(setWishItems(user?.access_token, slug))
    await dispatch(fetchWishlist(user?.access_token));
    if (routeName?.includes("Home")) {
      const json = await dispatch(fetchFeatured(1, "drinks", { category_id: 1 }));
      dispatch(fetchFeatured(1, "bakery", { category_id: 4 }))
    }
    else dispatch(setFavourite(slug))
  }



  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.imageView, { height: 100 }]}>
        {!!images && <FastImage resizeMode="cover" style={styles.image} source={{ uri: images[0] }} />}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.tagView}>
          {tags?.map((i, idx) => {
            return (
              <Text category="c3" status="body" marginRight={4} key={idx}>
                #{i}
              </Text>
            );
          })}
        </View>
        <Text category="b3" marginTop={4} numberOfLines={2}>
          {name}
        </Text>
        {/* <Text category="b2">{currency}{price_sale}</Text> */}
        {type ?
          (
            <View style={styles.priceViewContainer}>
              <View style={styles.priceView}>
                <Text category="b3" status="placeholder" marginLeft={4} marginTop={3}>
                {type == 'SINGLE' ? 'Single' : 'Pack'}
                </Text>
                <Text category="b2" status="placeholder" marginLeft={4} marginTop={3}>
                  {currency}{type == 'SINGLE' ? price : p_price}
                </Text>
              </View>
              {/* <View style={{width: '70%', alignItems: 'flex-end'}}>
                <Text category="t1" status="placeholder" marginLeft={4} marginTop={3}>
                  {type == 'SINGLE' ? 'Single' : 'Pack'}
                </Text>
              </View> */}
            </View>
          ) :
          (
            <View style={styles.priceViewContainer}>
              <View style={styles.priceView}>
                <Text category="b2" status="placeholder" marginLeft={4} marginTop={3}>
                  Single
                </Text>
                <Text category="b2" status="placeholder" marginLeft={4} marginTop={3}>
                  {currency}{price}
                </Text>
              </View>
              <View style={styles.priceView}>
                <Text category="b2" status="placeholder" marginLeft={4} marginTop={3}>
                  Pack
                </Text>
                <Text category="b2" status="placeholder" marginLeft={4} marginTop={3}>
                  {currency}{p_price}
                </Text>
              </View>
            </View>
          )
        }
      </View>
      {is_sale && (
        <View style={styles.saleTag}>
          <SvgSale />
        </View>
      )}
      <TouchableOpacity onPress={handleFavourite} activeOpacity={0.7} style={styles.favorite}>
        <Icon
          name="heart"
          pack="assets"
          style={[styles.icon, { tintColor: (is_wishlist || is_wishlist == 1) ? "#ce1212" : theme['background-basic-color-6'] }]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Loading = ({ style }: { style?: ViewStyle }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.imageView, { height: 100 }]}>
        <Skeleton width="100%" height="100%" variant="box" />
      </View>
      <View style={styles.flex}>
        <View style={styles.tagLoading}>
          <Skeleton width="70%" height={12} />
        </View>
        <View style={styles.name}>
          <Skeleton width="100%" height={18} />
        </View>
        <View style={styles.priceLoading}>
          <Skeleton width="60%" height={18} />
        </View>
      </View>
    </View>
  );
};

ProductHorizontal.Loading = Loading;

export default ProductHorizontal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageView: {
    borderRadius: 8,
    overflow: 'hidden',
    aspectRatio: 1 / 1,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1,
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  priceViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    // justifyContent: 'center',
    // backgroundColor: 'aqua',
    // gap: 10,
  },
  priceView: {
    marginLeft: 10,
  },
  tagLoading: {
    marginTop: 16,
  },
  name: {
    marginTop: 4,
  },
  priceLoading: {
    marginTop: 8,
  },
  top: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sale: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 24,
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
    width: 16,
    height: 16,
  },
  saleTag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
