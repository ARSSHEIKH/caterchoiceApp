import React, { useCallback, useRef, useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import {
  CollectionItem,
  Container,
  NavigationAction,
  ProductHorizontal,
  ProductItem,
  Text,
  TitleBar,
} from 'components';
import { Icon, Input, TopNavigation } from '@ui-kitten/components';
import { useDrawer, useLayout } from 'hooks';
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Frame from './components/Frame';
import Header from './components/Header';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { ICollection, ProductFragment } from 'constants/types';
import { collections, products_list, recent_list } from 'constants/data';
import { RootStackParamList } from 'navigation/types';
import { fetchFeatured, fetchPromotions, productSelector, searchProduct } from "../../store/slices/productSlice";
import { useAppDispatch, useAppSelector } from 'store/store';
import FastImage from 'react-native-fast-image';
import PromotionBanner from './PromotionBanner';
import { userSelector } from 'store/slices/userSlice';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { fetchCategory } from 'store/slices/categorySlice';
import { fetchBanner } from 'store/slices/bannerSlice';
import Search from 'components/Search';
import { TouchableWithoutFeedback } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = React.memo(() => {
  const { openDrawer } = useDrawer();
  const dispatch = useAppDispatch();
  const { width, top, bottom } = useLayout();
  const { t } = useTranslation(['common', 'home']);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { featured } = useAppSelector(productSelector);
  const { user } = useAppSelector(userSelector)
  const [searchVisible, setSearchVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showSearchData, setShowSearchData] = React.useState(false);
  const [search, setSearch] = React.useState("")



  // React.useEffect(() => {

  // }, []);



  React.useEffect(() => {
    const banner = async () => {
      const json = await dispatch(fetchBanner());
      await dispatch(fetchCategory());
    }
    banner();
    const products = async () => {
      setLoading(true);
      const json = await dispatch(fetchFeatured(1, "drinks", { category_id: 1 }));
      dispatch(fetchFeatured(1, "bakery", { category_id: 4 }))
      setLoading(false);
    }
    products();

    return () => {
      setSearch("")
      setShowSearchData(false)
      setSearchVisible(false)
    }
  }, [user?.access_token])

  const renderItem = React.useCallback(
    ({ item, index }: { item: ProductFragment; index: number }) => {
      return loading ? (
        <ProductItem.Loading
          style={{
            width: (width - 48) / 2,
            marginLeft: index % 2 !== 0 ? 8 : 16,
            marginRight: index % 2 !== 0 ? 16 : 8,
            marginBottom: 16,
          }}
        />
      ) : (
        <ProductItem
          style={{
            width: (width - 48) / 2,
            marginLeft: index % 2 !== 0 ? 8 : 16,
            marginRight: index % 2 !== 0 ? 16 : 8,
            marginBottom: 16,
          }}
          item={item}
          onPress={() => navigate('Product', { screen: 'ProductDetails', params: { item: item } })}
        />
      );
    },
    [loading]
  );

  const renderCollectionItem = React.useCallback(
    ({ item }: { item: ICollection }) => {
      return loading ? (
        <CollectionItem.Loading />
      ) : (
        <CollectionItem
          item={item}
          onPress={() => navigate('Product', { screen: 'ProductGrid' })}
        />
      );
    },
    [loading]
  );

  const renderEmpty = () => (
    <View>
      <Text>Empty</Text>
    </View>
  );

  const textInputRef = useRef(null);
  const renderHeader = () => <Header />;

  const renderFooter = () => (
    <View>
      {/* <Frame /> */}
      {/* <TitleBar
        marginTop={1}
        marginBottom={10}
        paddingHorizontal={16}
        title={t('Check Our Products')}
        textStyle={{ fontSize: 20 }}
      /> */}


      <PromotionBanner />

      <TitleBar
        marginTop={32}
        marginBottom={16}
        paddingHorizontal={16}
        title={t('DRINKS')}
        accessoryRight={{
          title: t('common:view_all'),
          onPress: () => navigate('Product', { screen: 'ProductGrid', params: { category: { name: "DRINKS", id: 1 } } }),
        }}
      />
      <FlatList
        data={featured?.drinks || []}
        horizontal
        renderItem={renderItem}
        //renderItem={renderCollectionItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentBestSeller}
        scrollEventThrottle={16}
        snapToInterval={width - (24 + 84 - 12)}
        bounces={false}
        pagingEnabled={false}
        decelerationRate="fast"
      />
      <TitleBar
        marginTop={32}
        marginBottom={16}
        paddingHorizontal={16}
        title={t('BAKERY')}
        accessoryRight={{
          title: t('common:view_all'),
          onPress: () => navigate('Product', { screen: 'ProductGrid', params: { category: { name: "BAKERY", id: 4 } } }),
        }}
      />
      {/* <View style={styles.paddi:ng}> */}
      <FlatList
        data={featured?.bakery || []}
        horizontal
        renderItem={renderItem}
        //renderItem={renderCollectionItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentBestSeller}
        scrollEventThrottle={16}
        snapToInterval={width - (24 + 84 - 12)}
        bounces={false}
        pagingEnabled={false}
        decelerationRate="fast"
      />
    </View>
    // </View>
  );


  const handleOutsideClick = () => {
    setShowSearchData(false);
    Keyboard.dismiss()
  };
  return (
    <TouchableWithoutFeedback onPress={() => handleOutsideClick(false)}>
      <Container useSafeArea={false}>
        <TopNavigation
          style={{ paddingTop: top + 12 }}
          accessoryLeft={<NavigationAction icon="menu" onPress={openDrawer} />}
          accessoryRight={() => (
            <Text style={styles.flex}>
              <NavigationAction marginRight={5} style={{paddingHorizontal: 15,}} icon={searchVisible ? "close" : "search"} onPress={() => {
                searchVisible && setSearch("")
                setSearchVisible(!searchVisible)
                // navigate("Product", {
                //   screen: "ProductGrid",
                //   params: { inputFocus: true }
                // })
              }} />
              {/* <NavigationAction icon="notification" osnPress={() => { }} /> */}
            </Text>
          )}
          title={() => (
            <Image resizeMode='contain' style={[styles.icon40, { marginTop: top  }]} source={Images.logo} />
          )}
        />
        {searchVisible &&
          <Search setShow={setShowSearchData} show={showSearchData} search={search} setSearch={setSearch} />
        }
        {/* <Pressable onPress={() => setShowSearchData(false)}> */}
        <FlatList
          style={styles.container}
          contentContainerStyle={{ paddingBottom: bottom + 86 }}
          data={([])}
          numColumns={2}
          renderItem={renderItem}
          //ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          keyExtractor={(item) => `${item.id}`}
        />
        {/* </Pressable> */}
      </Container>
    </TouchableWithoutFeedback>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  contentBestSeller: {
    paddingLeft: 16,
    paddingRight: 16 - 8,
  },
  item: {
    marginBottom: 16,
  },
  productHorizontal: {
    marginBottom: 12,
  },
  padding: {
    paddingHorizontal: 16,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  icon40: {
    width: 200,
    height: 50,
  },
});
