import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ProductItem } from 'components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useLayout } from 'hooks';

import keyExtractor from 'utils/keyExtractor';
import { products_list } from 'constants/data';
import { ProductFragment } from 'constants/types';
import { RootStackParamList } from 'navigation/types';

import {fetchProduct, productSelector} from "../../../../store/slices/productSlice";
import { useAppDispatch, useAppSelector } from 'store/store';

let onEndReachedCalledDuringMomentum = true;
let page = 1;

const Wishlist: React.FC = () => {
  const { width, bottom } = useLayout();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {data} = useAppSelector(productSelector);

  const onEndReached = React.useCallback(async()=>{

    if(!onEndReachedCalledDuringMomentum){
      page++;
      const json = await dispatch(fetchProduct(page,{
        wishlist:true
      }));
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
      {/* <FlatList
        data={products_list}
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: bottom }}
        scrollEnabled={false}
      /> */}
      <FlatList
          data={data || []}
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

export default Wishlist;

const styles = StyleSheet.create({
  container: {},
});
