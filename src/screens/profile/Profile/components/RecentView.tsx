import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ProductItem } from 'components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useLayout } from 'hooks';

import keyExtractor from 'utils/keyExtractor';
import { products_list } from 'constants/data';
import { ProductFragment } from 'constants/types';
import { RootStackParamList } from 'navigation/types';

import { fetchProduct, productSelector } from "../../../../store/slices/productSlice";
import { useAppDispatch, useAppSelector } from 'store/store';
import { userSelector } from 'store/slices/userSlice';

let onEndReachedCalledDuringMomentum = true;
let page = 1;
function findCommonItems(array1, array2) {
  var commonItems = [];
  try {

    for (var i = 0; i < array1.length; i++) {
      var currentItem = array1[i].id
      console.log('====================================');
      console.log("commonItems", currentItem);
      console.log('====================================');

      if (array2?.indexOf(currentItem) !== -1) {
        commonItems.push(array1[i]);
      }
    }
  } catch (error) {

  }
  return commonItems;
}
const RecentView: React.FC = () => {
  const { width, bottom } = useLayout();
  const { user } = useAppSelector(userSelector);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { data } = useAppSelector(productSelector);
  const [recentlyViewed, setRecentlyViewed] = React.useState([])

  React.useEffect(() => {
    dispatch(fetchProduct());
  }, [user])

  React.useEffect(() => {
    setRecentlyViewed(user?.recently_viewed ? typeof (user?.recently_viewed) == "string" ? JSON.parse(user?.recently_viewed) : user?.recently_viewed : [])
    // console.log("recently_viewed", data)
    // let items = findCommonItems(data, user?.recently_viewed);

    // setRecentlyViewed(items)
  }, [user?.recently_viewed])

  const onEndReached = React.useCallback(async () => {
    return
    if (!onEndReachedCalledDuringMomentum) {
      page++;
      const json = await dispatch(fetchProduct(page));
      onEndReachedCalledDuringMomentum = true;
    }
  }, []);

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
          onPress={() => navigate('Product', { screen: 'ProductDetails' })}
        />
      );
    },
    [loading]
  );

  return (
    <View style={[styles.container, { width: width }]}>
      <FlatList
        data={recentlyViewed || []}
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}

      />
    </View>
  );
};

export default RecentView;

const styles = StyleSheet.create({
  container: {},
});
