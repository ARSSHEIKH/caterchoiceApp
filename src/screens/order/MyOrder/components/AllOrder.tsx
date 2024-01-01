import React from 'react';
import { OrderItem } from 'components';
import { Icon, Input } from '@ui-kitten/components';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { RootStackParamList } from 'navigation/types';
import { OrderFragment, Order_Types_Enum } from 'constants/types';

import {fetchOrder, orderSelector} from "../../../../store/slices/orderSlice";
import { useAppDispatch, useAppSelector } from 'store/store';

let onEndReachedCalledDuringMomentum = true;
let page = 1;

interface AllOrderProps {}

const AllOrder: React.FC<AllOrderProps> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const {data} = useAppSelector(orderSelector);

  React.useEffect(() => {
    page = 1
    dispatch(fetchOrder(page,{}));
  }, []);


  const onEndReached = React.useCallback(async()=>{
    if(!onEndReachedCalledDuringMomentum){
      page++;
      const json = await dispatch(fetchOrder(page,{}));
      onEndReachedCalledDuringMomentum = true;
  }
  }, []);


  const listHeaderComponent = React.useCallback(() => {
    return (
      <Input
        placeholder={t('search')}
        accessoryLeft={<Icon pack="assets" name="search" />}
        status="search"
      />
    );
  }, []);

  const renderItem = React.useCallback(({ item }: { item: OrderFragment }) => {
    return (
      <OrderItem
        style={styles.item}
        item={item}
        // buttonLeft={{
        //   title: t('track_order'),
        //   onPress: () => navigate('Product', { screen: 'OrderTracking' }),
        // }}
        // buttonRight={{
        //   title: t('review'),
        //   onPress: () => navigate('Product', { screen: 'ProductReview' }),
        // }}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={listHeaderComponent}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
      />
    </View>
  );
};

export default AllOrder;

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  item: {
    marginTop: 16,
  },
});
