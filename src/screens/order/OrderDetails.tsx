import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  Container,
  Content,
  NavigationAction,
  ProductItem,
  ShippingDetailsItem,
  Text,
  TitleBar,
} from 'components';
import { TopNavigation, Layout, Divider, Icon, Button } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { RootStackParamList } from 'navigation/types';
import { ProductFragment } from 'constants/types';
import { useAppDispatch, useAppSelector } from 'store/store';
import {orderSelector, removeCart, decreament, addCart} from "../../store/slices/orderSlice";

const OrderDetails = React.memo(() => {
  const { width, bottom, bottomButton } = useLayout();
  const { t } = useTranslation(['common', 'order']);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const {cart} = useAppSelector(orderSelector);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const products_list: ProductFragment[] = [
    {
      id: '0',
      images: [Images.image11],
      tags: ['ACCESSORY'],
      name_product: 'Lipsy lace body dress in black',
      price_origin: 500,
      price_sale: 324,
    },
    {
      id: '1',
      images: [Images.image23],
      tags: ['SHOES'],
      name_product: `Children's loafer with Web`,
      price_origin: 300,
      price_sale: 123,
    },
    {
      id: '2',
      images: [Images.image10],
      name_product: 'Lion head ring with crystal',
      tags: ['SHOES'],
      price_origin: 800,
      price_sale: 786,
    },
  ];

  const renderItem = React.useCallback(
    ({ item }: { item: ProductFragment }) => {
      return loading ? (
        <ProductItem.Loading style={{ width: (width - 44) / 2, marginRight: 12 }} />
      ) : (
        <ProductItem
          style={{ width: (width - 44) / 2, marginRight: 12 }}
          item={item}
          onPress={() => navigate('Product', { screen: 'ProductDetails' })}
        />
      );
    },
    [loading]
  );

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + (item.quantity || 0) * (item.price || 0) + item.quantity * (((item.price || 0) * (item.tax || 0)) / 100),
      0
  );
  }

  return (
    <Container>
      <TopNavigation title={t('common:detail_order')} accessoryLeft={<NavigationAction />} />
      <Content contentContainerStyle={{ paddingBottom: bottomButton }}>
        <TitleBar
          title={'Order #A203VI'}
          accessoryRight={{ title: t('common:view_all') }}
          paddingHorizontal={16}
          marginBottom={8}
        />
        {/* <View>
          <FlatList
            data={products_list || []}
            renderItem={renderItem}
            horizontal
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          />
        </View> */}
        <Divider style={styles.line} />
        <Text marginLeft={16} marginTop={16} category="t1" marginBottom={8}>
          {t('common:payment')}
        </Text>
        <Layout level="10" style={styles.box}>
          <View style={styles.row}>
            <Text category="b1" status="description">
              {t('common:sub_total')}:
            </Text>
            <Text category="t1">${getTotal()}</Text>
          </View>
          {/* <View style={styles.row}>
            <Text category="b1" status="description">
              {t('common:discount')}:
            </Text>
            <Text category="t1">-4.27</Text>
          </View> */}
          <View style={styles.row}>
            <Text category="b1" status="description">
              {t('common:total')}:
            </Text>
            <Text category="t1">${getTotal()}</Text>
          </View>
        </Layout>
        <Divider style={styles.line} />
        <Text marginLeft={16} marginTop={16} category="t1" marginBottom={8}>
          {t('order:shipping_to_my_home')}
        </Text>
        {/* <Layout level="10" style={styles.box1}>
          <ShippingDetailsItem
            icon="car"
            description="Shop 03&04, TTTM BigC, 222 Đ. Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội 11313"
          />
          <ShippingDetailsItem icon="phone" description="024 6658 2992" is_last />
        </Layout> */}
      </Content>
      <Layout style={[styles.bottomView, { paddingBottom: bottom + 16 }]}>
        <Button
          children={t('common:back_to_home')}
          onPress={() => navigate('Drawer', { screen: 'MainBottomTab' })}
        />
      </Layout>
    </Container>
  );
});

export default OrderDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  box: {
    borderRadius: 4,
    padding: 16,
    marginHorizontal: 16,
  },
  line: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  box1: {
    borderRadius: 4,
    paddingTop: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    paddingBottom: 4,
  },
  bottomView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 8,
  },
  contentContainer: {
    paddingLeft: 16,
    paddingRight: 4,
  },
});
