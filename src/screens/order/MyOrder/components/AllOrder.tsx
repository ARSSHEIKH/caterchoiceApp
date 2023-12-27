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
    dispatch(fetchOrder(page,{}));
  }, []);


  const onEndReached = React.useCallback(async()=>{

    if(!onEndReachedCalledDuringMomentum){
      page++;
      const json = await dispatch(fetchOrder(page,{}));
      onEndReachedCalledDuringMomentum = true;
  }
  }, []);

  // const data: OrderFragment[] = [
  //   {
  //     order_id: 'A203VI',
  //     status: Order_Types_Enum.Shipped,
  //     products: [
  //       {
  //         id: '0',
  //         images: [Images.image11],
  //         tags: ['ACCESSORY'],
  //         name_product: 'LKN shirred smock dress Popular Summer',
  //         price_origin: 300,
  //         price_sale: 233,
  //       },
  //       {
  //         id: '1',
  //         images: [Images.image23],
  //         tags: ['SHOES'],
  //         name_product: 'Lipsy lace body dress in ablack LG',
  //         price_origin: 600,
  //         price_sale: 473,
  //       },
  //     ],
  //   },
  //   {
  //     order_id: 'A203WE',
  //     status: Order_Types_Enum.Processing,
  //     products: [
  //       {
  //         id: '0',
  //         images: [Images.image20],
  //         tags: ['SHOES'],
  //         name_product: 'Steve Madden Forever mules with faux fur lining',
  //         price_origin: 500,
  //         price_sale: 454,
  //       },
  //     ],
  //   },
  //   {
  //     order_id: 'A303BH',
  //     status: Order_Types_Enum.Unpaid,
  //     products: [
  //       {
  //         id: '0',
  //         images: [Images.image21],
  //         tags: ['ACCESSORY'],
  //         name_product: 'LKN shirred smock dress Popular Summer',
  //         price_origin: 233,
  //         price_sale: 190,
  //       },
  //       {
  //         id: '1',
  //         images: [Images.image20],
  //         tags: ['SHOES'],
  //         name_product: 'Topshop Peace chunky chain mule sandal in khaki',
  //         price_origin: 367,
  //         price_sale: 245,
  //       },
  //     ],
  //   },
  //   {
  //     order_id: 'A203WE',
  //     status: Order_Types_Enum.Return,
  //     products: [
  //       {
  //         id: '0',
  //         images: [Images.image22],
  //         tags: ['WATCHES'],
  //         name_product: 'Steve Madden Forever mules with faux fur lining',
  //         price_origin: 233,
  //         price_sale: 178,
  //       },
  //       {
  //         id: '1',
  //         images: [Images.image20],
  //         tags: ['SHOES'],
  //         name_product: 'NA-KD shirred smock dress Popular Summer',
  //         price_origin: 344,
  //         price_sale: 233,
  //       },
  //     ],
  //   },
  // ];

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
