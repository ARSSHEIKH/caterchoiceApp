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

interface ShippedProps {}

const Shipped: React.FC<ShippedProps> = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const data: OrderFragment[] = [
    {
      order_id: 'A203VI',
      status: Order_Types_Enum.Shipped,
      products: [
        {
          id: '0',
          images: [Images.image11],
          tags: ['BAG'],
          name_product: 'LKN shirred smock dress Popular Summer',
          price_origin: 344,
          price_sale: 233,
        },
        {
          id: '1',
          images: [Images.image23],
          tags: ['SHOES'],
          name_product: 'Lipsy lace body dress in ablack LG',
          price_origin: 324,
          price_sale: 189,
        },
      ],
    },
    {
      order_id: 'A203VI',
      status: Order_Types_Enum.Shipped,
      products: [
        {
          id: '0',
          images: [Images.long_tee],
          tags: ['TOP', 'JACKET'],
          name_product: 'Steve Madden Forever mules with faux fur lining',
          price_origin: 300,
          price_sale: 245,
        },
        {
          id: '1',
          images: [Images.image23],
          tags: ['SHOES'],
          name_product: 'LKN shirred smock dress Popular Summer',
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
          title: t('track_order'),
          onPress: () => navigate('Product', { screen: 'OrderTracking' }),
        }}
        buttonRight={{
          title: t('review'),
          onPress: () => navigate('Product', { screen: 'ProductReview' }),
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

export default Shipped;

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
