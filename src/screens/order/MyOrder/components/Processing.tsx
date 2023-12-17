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

interface ProcessingProps {}

const Processing: React.FC<ProcessingProps> = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const data: OrderFragment[] = [
    {
      order_id: 'A203WE',
      status: Order_Types_Enum.Processing,
      products: [
        {
          id: '0',
          images: [Images.image20],
          tags: ['SHOES'],
          name_product: 'LKN shirred smock dress Popular Summer',
          price_origin: 344,
          price_sale: 233,
        },
      ],
    },
    {
      order_id: 'A203WE',
      status: Order_Types_Enum.Processing,
      products: [
        {
          id: '0',
          images: [Images.pant_1],
          tags: ['BOTTOM'],
          name_product: 'Lipsy lace body dress in ablack LG',
          price_origin: 324,
          price_sale: 189,
        },
        {
          id: '1',
          images: [Images.polo],
          tags: ['TOP', 'POLO'],
          name_product: 'Steve Madden Forever mules with faux fur lining',
          price_origin: 300,
          price_sale: 245,
        },
        {
          id: '2',
          images: [Images.pant_2],
          tags: ['BOTTOM'],
          name_product: 'Lipsy lace body dress in ablack LG',
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
          title: t('received'),
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

export default Processing;

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
