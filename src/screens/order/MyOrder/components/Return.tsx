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

interface ReturnProps {}

const Return: React.FC<ReturnProps> = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const data: OrderFragment[] = [
    {
      order_id: 'A203WE',
      status: Order_Types_Enum.Return,
      products: [
        {
          id: '0',
          images: [Images.image22],
          tags: ['WATCHES'],
          name_product: 'Lipsy lace body dress in ablack LG',
          price_origin: 300,
          price_sale: 234,
        },
        {
          id: '1',
          images: [Images.image20],
          tags: ['SHOES'],
          name_product: 'LKN shirred smock dress Popular Summer',
          price_origin: 400,
          price_sale: 267,
        },
      ],
    },
    {
      order_id: 'A203WE',
      status: Order_Types_Enum.Return,
      products: [
        {
          id: '0',
          images: [Images.image20],
          tags: ['SHOES'],
          name_product: 'Steve Madden Forever mules with faux fur lining',
          price_origin: 400,
          price_sale: 321,
        },
        {
          id: '1',
          images: [Images.image20],
          tags: ['SHOES'],
          name_product: 'Big Logo Jacket With Sweet Long Sheet',
          price_origin: 233,
          price_sale: 133,
        },
      ],
    },
  ];

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
        buttonLeft={{
          title: t('detail_order'),
          onPress: () => navigate('Product', { screen: 'OrderDetails' }),
        }}
        buttonRight={{
          title: t('buy_again'),
          onPress: () => {},
        }}
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

export default Return;

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
