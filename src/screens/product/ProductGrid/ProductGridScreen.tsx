import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Container, NavigationAction, ProductHorizontal, ProductItem } from 'components';
import { useTheme, TopNavigation, Input, Icon } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';

import Filter from './components/Filter';
import Carousel from 'react-native-reanimated-carousel';
import BannerProductGrid from './components/BannerProductGrid';

import { RootStackParamList } from 'navigation/types';
import { Grid_Types_Enum, ProductFragment, IProductItemState } from 'constants/types';
import { data_banner_product_grid, products_list, recent_list } from 'constants/data';
import { fetchProduct, fetchPromotions, productSelector, searchProduct } from "../../../store/slices/productSlice";
import { useAppDispatch, useAppSelector } from 'store/store';

let onEndReachedCalledDuringMomentum = true;
let page = 1;
let timer: any;

const ProductGridScreen = React.memo(({ route }) => {
  const theme = useTheme();
  const { t } = useTranslation(['common', 'product']);
  const { bottom } = useLayout();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const bottomSheetPhotoRef = React.useRef<BottomSheet>(null);
  const initialSnapPoints = React.useMemo(() => ['1%', 'CONTENT_HEIGHT'], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const [search, setSearch] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [type, setType] = React.useState<Grid_Types_Enum>(Grid_Types_Enum.Column);
  const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
  const { data, is_more } = useAppSelector(productSelector);

  const { id, name } = Object.assign({}, route?.params?.category);


  const fetchProducts = async (page: number, params: Object) => {
    return route?.params?.isPromotion ? await dispatch(fetchPromotions(page)) : await dispatch(fetchProduct(page, params))
  }

  console.log("data", data)

  const applyFilter = (s: string) => {
    page = 1;
    clearTimeout(timer);
    timer = setTimeout(async () => {
      // setLoading(true);
      const json = await dispatch(fetchProducts(page, {
        category_id: id,
        search: s
      }, true));
      // setLoading(false);
    }, 100);
  }

  React.useEffect(() => {
    onEndReachedCalledDuringMomentum = true;
    page = 1;
    if (route?.params?.search) {
      setLoading(false);
      // productSearch(route?.params?.search)
    }
    else {
      const product = async () => {
        setLoading(true);
        const json = await fetchProducts(page, { category_id: id })
        setLoading(false);
      }
      product();
    }
  }, [route?.params?.search])

  const renderBanner = React.useCallback(({ item }) => {
    return <BannerProductGrid item={item} />;
  }, []);

  const onEndReached = React.useCallback(async () => {
alert(onEndReachedCalledDuringMomentum)
    if (!onEndReachedCalledDuringMomentum && !isLoadingMore && is_more) {
      page++;
      if (route?.params?.search) {
        const product = await dispatch(searchProduct(item))
      }
      else {
        const json = await dispatch(fetchProduct(page, {
          category_id: id
        }));
      }
      setIsLoadingMore(false)
      onEndReachedCalledDuringMomentum = true;
    }

  }, [isLoadingMore, is_more, onEndReachedCalledDuringMomentum]);

  const productSearch = (s: string) => {
    setSearch(s);
    applyFilter(s);
  }


  const renderHeader =
    () => (
      <View>
        <Input
          style={styles.search}
          status="search"
          value={search}
          onChangeText={(e) => setSearch(e)}
          placeholder={'Search... '}
          accessoryLeft={<Icon pack="assets" name="search" />}
          accessoryRight={(props) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.filter, { borderColor: theme['background-basic-color-5'] }]}
              onPress={() => bottomSheetPhotoRef.current?.expand()}>
              <Icon {...props} pack="assets" name="filter" />
            </TouchableOpacity>
          )}
        />
      </View>
    )


  const renderItem = React.useCallback(
    ({ item, index }: { item: IProductItemState; index: number }) => {
      return loading ? (
        <View style={styles.item}>
          {type === Grid_Types_Enum.Column ? (
            <ProductItem.Loading
              style={{
                marginLeft: index % 2 !== 0 ? 8 : 16,
                marginRight: index % 2 !== 0 ? 16 : 8,
              }}
            />
          ) : (
            <ProductHorizontal.Loading style={styles.productHorizontal} />
          )}
        </View>
      ) : (
        <View style={styles.item}>
          {type === Grid_Types_Enum.Column ? (
            <ProductItem
              style={{
                marginLeft: index % 2 !== 0 ? 8 : 16,
                marginRight: index % 2 !== 0 ? 16 : 8,
              }}
              item={item}
              onPress={() => navigate('Product', { screen: 'ProductDetails', params: { item: item } })}
            />
          ) : (
            <ProductHorizontal
              item={item}
              style={styles.productHorizontal}
              onPress={() => navigate('Product', { screen: 'ProductDetails', params: { item: item } })}
            />
          )}
        </View>
      );
    },
    [loading, type]
  );

  const HEIGHT_BOTTOM_TAB = bottom + 100;
  return (
    <Container>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={(name || "").toString()}
        accessoryRight={
          <View style={styles.row}>
            <NavigationAction
              icon={type === Grid_Types_Enum.Column ? 'column-fill' : 'column'}
              marginRight={12}
              onPress={() => setType(Grid_Types_Enum.Column)}
            />
            <NavigationAction
              icon={type === Grid_Types_Enum.Horizontal ? 'horizontal-fill' : 'horizontal'}
              onPress={() => setType(Grid_Types_Enum.Horizontal)}
            />
          </View>
        }
      />
      <Input
        style={styles.search}
        status="search"
        value={route?.params?.search ?? search}
        onChangeText={productSearch}
        placeholder={'Search... '}
        accessoryLeft={<Icon pack="assets" name="search" />}
        accessoryRight={(props) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.filter, { borderColor: theme['background-basic-color-5'] }]}
            onPress={() => bottomSheetPhotoRef.current?.expand()}>
            <Icon {...props} pack="assets" name="filter" />
          </TouchableOpacity>
        )}
      />
      <View style={{ }}>

        {type === Grid_Types_Enum.Column ? (
          <FlatList
            data={data || []}
            numColumns={2}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            // ListHeaderComponent={renderHeader}
            keyExtractor={(item) => `${item.id}`}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
            ListFooterComponent={!isLoadingMore && is_more ? <ActivityIndicator size={28} /> : null}
            contentContainerStyle={{
              paddingBottom: HEIGHT_BOTTOM_TAB
            }}
          />
        ) : (
          <View>
            <FlatList
              data={data || []}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              //ListHeaderComponent={renderHeader}
              keyExtractor={(item) => `${item.id}`}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.5}
              onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
              ListFooterComponent={!isLoadingMore && is_more ? <ActivityIndicator size={28} /> : null}
              contentContainerStyle={{
                paddingBottom: HEIGHT_BOTTOM_TAB
              }}
            />
          </View>
        )}
      </View>
      <BottomSheet
        ref={bottomSheetPhotoRef}
        snapPoints={animatedSnapPoints}
        index={-1}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={BottomSheetBackdrop}>
        <BottomSheetView onLayout={handleContentLayout}>
          <Filter />
        </BottomSheetView>
      </BottomSheet>
    </Container>
  );
});

export default ProductGridScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  filter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    borderLeftWidth: 1,
  },
  item: {
    marginBottom: 16,
    flex: 1,
  },
  productHorizontal: {
    marginHorizontal: 16,
  },
});
