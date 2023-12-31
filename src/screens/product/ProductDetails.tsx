import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import {
  BlogItem,
  ColorItem,
  Container,
  FeatureItem,
  NavigationAction,
  ProductItem,
  SizeItem,
  Text,
  TitleBar,
} from 'components';
import { useTheme, Layout, TopNavigation, Icon, Button, Radio, Select, SelectItem, RadioGroup } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import SvgStar from 'assets/svgs/SvgStar';
import FastImage from 'react-native-fast-image';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { ProductFragment } from 'constants/types';
import { ProductStackParamList, RootStackParamList } from 'navigation/types';
import { data_blogs, data_colors, data_sizes, products_list } from 'constants/data';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAppDispatch, useAppSelector } from 'store/store';
import { addCart } from "../../store/slices/orderSlice";
import { setFavourite } from "../../store/slices/productSlice";
import { cdn, currency } from "constants/common";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, userSelector } from 'store/slices/userSlice';

export const priceVariants = [
  {
    id: 1,
    name: "Single"
  },
  {
    id: 2,
    name: "Pack"
  },
]
const ProductDetails = React.memo(({ route }) => {
  const item = Object.assign({}, route?.params?.item);
  const theme = useTheme();
  const { width, bottom } = useLayout();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userSelector);
  const { t } = useTranslation(['common', 'product_details']);
  const { navigate } = useNavigation<NavigationProp<ProductStackParamList>>();
  const { navigate: _navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [sizeSelected, setSizeSelected] = React.useState<string>('m');
  const [colorSelected, setColorSelected] = React.useState<string>('#B5E4CA');
  const [isFavourite, setIsFavourite] = React.useState<boolean>(item?.is_wishlist);
  const [added, setAdded] = React.useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState(0)

  let photos: string[] = [];
  const images = item?.image?.split(',');
  images.map((item: string) => {
    photos.push(item);
  });

  React.useEffect(() => {
    // setAdded(false)
    setTimeout(() => {
      setLoading(false);
      let recently_viewed = user?.recently_viewed ?? []
      const findIndex = user?.recently_viewed?.findIndex(r => r == item?.id)
      if (findIndex !== -1 && findIndex != undefined) {
        return
      }
      else {
        if (item && item.id) {
          try {
            recently_viewed.push(item);

            const storeUser = {
              ...user,
              recently_viewed
            }

            dispatch(setUser(storeUser))
            AsyncStorage.setItem("user", JSON.stringify(storeUser))
          } catch (error) {

          }
        } else {
          // Handle the case where item or item.id is undefined or null
          console.error("Item or item.id is undefined or null");
        }
      }
    }, 3000);
  }, [item]);

  const ship_details = React.useMemo(
    () => [
      {
        icon: 'car',
        content:
          'Free',
      },
      {
        icon: 'cod',
        content: 'COD Policy',
      },
      {
        icon: 'policy',
        content: 'Return Policy',
      },
    ],
    []
  );

  const renderSize = React.useCallback(
    ({ item }: { item: any }) => {
      return (
        <SizeItem
          size={item}
          sizeSelected={sizeSelected}
          onPress={() => setSizeSelected(item)}
          style={styles.size}
        />
      );
    },
    [sizeSelected]
  );

  const SIZE_IMG = width - 48;
  const progress = useSharedValue(0);
  const optionStyle = useAnimatedStyle(() => {
    const _width = interpolate(progress.value, [0, 1], [24, SIZE_IMG]);

    return {
      height: 88,
      width: _width,
      position: 'absolute',
      bottom: 16,
      right: 16,
      zIndex: 1,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      overflow: 'hidden',
      backgroundColor: '#FFFFFF90',
    };
  });

  const toggleOption = () =>
    progress.value === 1 ? (progress.value = withTiming(0)) : (progress.value = withTiming(1));

  const goImageDetail = React.useCallback(() => {
    progress.value = withTiming(0);
    setTimeout(() => {
      _navigate('ImageDetail', {
        images: photos.map(i => ({ image_url: i, likes: 0, comments: 0 })),
      });
    }, 200);
  }, []);

  const addToCart = () => {
    dispatch(addCart({ ...item, variant: priceVariants[selectedVariant].name, type: selectedVariant == 0 ? 'SINGLE' : 'CASE' }));
    setAdded(true);
    //navigate('MyCart')
  }

  const listHeaderComponent = React.useCallback(() => {
    return (
      <View>
        <Layout style={styles.box}>
          <Animated.View>
            <Animated.View style={optionStyle}>
              <View style={styles.rowImage}>
                <TouchableOpacity activeOpacity={1} onPress={toggleOption} style={styles.box3}>
                  <View style={[styles.line, { backgroundColor: theme['color-basic-900'] }]} />
                  <FlatList
                    data={photos}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          style={styles.imageRatio}
                          activeOpacity={0.7}
                          onPress={goImageDetail}>
                          <Image source={{ uri: item }} style={styles.image} />
                        </TouchableOpacity>
                      );
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={goImageDetail}
              style={[
                styles.imageView,
                { width: width - 32, backgroundColor: theme['background-basic-color-2'] },
              ]}>
              <FastImage source={{ uri: photos?.[0] }} style={styles.image} />
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.row1}>

            <View style={styles.flexOne}>
              {/* <View style={styles.row2}>
                {Array(5)
                  .fill(5)
                  .map((i, idx) => {
                    return (
                      <SvgStar
                        key={idx}
                        fill={idx < 4 ? theme['color-yellow-500'] : theme['text-sub-color']}
                        style={{ marginRight: 4 }}
                      />
                    );
                  })}
                <Text category="c2" status="body">
                  (212)
                </Text>
              </View> */}

              <Text category="h6" marginTop={8} marginRight={16}>
                {item?.name}
              </Text>
            </View>
            <Text category="h3">{currency}{selectedVariant == 0 ? item?.price : item?.p_price}</Text>

          </View>
          <RadioGroup style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingLeft: 20
          }} selectedIndex={selectedVariant} onChange={(index) => { setSelectedVariant(index); setAdded(false) }} >
            {
              priceVariants?.map((v) => <Radio>{v?.name}</Radio>)
            }
          </RadioGroup>
          {/* <Text category="t1" marginTop={24} marginBottom={12} marginLeft={16}>
            {t('product_details:select_color')}
          </Text>
          <View style={styles.wrap}>
            {data_colors.map((i, idx) => {
              return (
                <ColorItem
                  color={i}
                  colorSelected={colorSelected}
                  key={idx}
                  onPress={() => setColorSelected(i)}
                  style={styles.color}
                />
              );
            })}
          </View> */}
          {/* <Text category="t1" marginTop={24} marginBottom={12} marginLeft={16}>
            {t('product_details:select_size')}
          </Text>
          <FlatList
            data={data_sizes}
            renderItem={renderSize}
            keyExtractor={keyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentSize}
          /> */}
        </Layout>
        <Layout style={styles.box1}>
          <Text category="h6" marginBottom={12}>
            {t('common:shipping_detail')}
          </Text>
          {ship_details.map((i, idx) => {
            return (
              <View
                key={idx}
                style={[
                  styles.shipDetails,
                  {
                    borderBottomColor:
                      idx < ship_details.length - 1
                        ? theme['background-basic-color-3']
                        : 'transparent',
                  },
                ]}>
                <Icon pack="assets" name={i.icon} />
                <View style={styles.flexOne}>
                  <Text category="b1" marginLeft={8}>
                    {i.content}
                  </Text>
                </View>
              </View>
            );
          })}
        </Layout>
        <Layout style={styles.box2}>
          <FeatureItem
            title={t('common:information')}
            onPress={() => navigate('ProductInformation', { item: item })}
          />
          {/* <FeatureItem
            title={t('product_details:size_guide')}
            onPress={() => navigate('ProductSize')}
          /> */}
          {/* <FeatureItem title={t('common:review')} onPress={() => navigate('ProductReview')} /> */}
          <FeatureItem title={t('common:shipping_detail')} is_last onPress={() => { }} />
        </Layout>
        {/* <TitleBar
          title={t('product_details:blog_fashion')}
          accessoryRight={{
            title: t('common:view_all'),
            onPress: () => {},
          }}
          paddingHorizontal={16}
          marginTop={32}
          marginBottom={16}
        /> */}
        {/* {data_blogs.map((i, idx) => {
          return (
            <BlogItem
              item={i}
              key={idx}
              style={styles.blog}
              onPress={() => _navigate('BlogDetails')}
            />
          );
        })}
        <TitleBar
          title={t('product_details:suggested_products')}
          accessoryRight={{
            title: t('common:view_all'),
            onPress: () => {},
          }}
          paddingHorizontal={16}
          marginTop={12}
          marginBottom={16}
        /> */}
      </View>
    );
  }, [colorSelected, sizeSelected, optionStyle]);

  const renderItem = React.useCallback(
    ({ item, index }: { item: ProductFragment; index: number }) => {
      return loading ? (
        <ProductItem.Loading
          style={{
            width: (width - 44) / 2,
            marginLeft: index % 2 !== 0 ? 8 : 16,
            marginRight: index % 2 !== 0 ? 16 : 8,
            marginBottom: 16,
          }}
        />
      ) : (
        <ProductItem
          style={{
            width: (width - 44) / 2,
            marginLeft: index % 2 !== 0 ? 8 : 16,
            marginRight: index % 2 !== 0 ? 16 : 8,
            marginBottom: 16,
          }}
          item={item}
          onPress={() => _navigate('Product', { screen: 'ProductDetails' })}
        />
      );
    },
    [loading]
  );


  return (
    <Container>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <View style={styles.row}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
              setIsFavourite(!isFavourite)
              dispatch(setFavourite(item))
            }}>
              <Icon
                name="heart"
                pack="assets"
                style={[styles.icon, { tintColor: isFavourite ? "#ce1212" : theme['background-basic-color-6'] }]}
              />
            </TouchableOpacity>
            <NavigationAction marginLeft={12} icon="share" onPress={() => { }} />
          </View>
        }
      />
      <View style={{paddingBottom: 95}}>
      <FlatList
        data={[]}
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeaderComponent}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        style={{
          backgroundColor: theme['background-basic-color-2'],
        }}
        contentContainerStyle={{
          paddingBottom: bottom + 16 + 48 + 25,
        }}
      />
      </View>
      <Layout style={[styles.bottomView, { paddingBottom: bottom + 16 + 48 }]}>
        {added ?
          <Button
            disabled={added}
            children={t('Added').toString()}
            style={[styles.button, { backgroundColor: "#ccc" }]}
            onPress={addToCart}
          /> : <Button
            children={t('Add to cart').toString()}
            disabled={(selectedVariant == 0 ? item?.price : item?.p_price) <= 0}
            style={styles.button}
            onPress={addToCart}
          />}
        <TouchableOpacity
          onPress={() => navigate('MyCart')}
          activeOpacity={0.7}
          style={[styles.cart, { borderColor: theme['color-primary-500'] }]}>
          <Icon pack="assets" name="cart" style={{ tintColor: theme['color-primary-500'] }} />
        </TouchableOpacity>
      </Layout>
    </Container>
  );
});

export default ProductDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    paddingVertical: 16,
  },
  imageView: {
    aspectRatio: 1 / 1,
    borderRadius: 12,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    flex: 1,
    marginHorizontal: 16,
  },
  flexOne: {
    flex: 1,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
  },
  color: {
    marginRight: 8,
    marginBottom: 12,
  },
  size: {
    marginRight: 8,
  },
  contentSize: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  box1: {
    marginTop: 16,
    padding: 16,
  },
  box2: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  shipDetails: {
    flexDirection: 'row',
    paddingVertical: 8,
    flex: 1,
    borderBottomWidth: 1,
  },
  blog: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  bottomView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
  cart: {
    width: 48,
    height: 48,
    borderRadius: 48,
    borderWidth: 1,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageRatio: {
    aspectRatio: 1 / 1,
    width: 64,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  box3: {
    paddingVertical: 12,
    flexDirection: 'row',
  },
  rowImage: {
    height: 88,
    flexDirection: 'row',
  },
  line: {
    marginHorizontal: 12,
    width: 2,
    height: 30,
    marginVertical: 16,
  },
  linear: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  icon: {
    width: 25,
    height: 25,
  },
});
