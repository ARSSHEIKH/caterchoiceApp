import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  NavigationAction,
  ShippingDetailsItem,
  Text,
  TitleBar,
  TrackOrderItem,
} from 'components';
import { Button, Layout, TopNavigation } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/store';
import { useLayout } from 'hooks';

import { ITrackOrder } from 'constants/types';
import { RootStackParamList } from 'navigation/types';
import { addressSelector } from 'store/slices/addressSlice';

const OrderTracking = React.memo(() => {
  const { bottom, bottomButton } = useLayout();
  const { t } = useTranslation(['common', 'order']);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { address } = useAppSelector(addressSelector);

  const data: ITrackOrder[] = [
    {
      icon: 'check',
      title: 'Order Accept',
      description: 'Order is confirmed',
      time: '3:00PM 20/03/2022',
      is_complete: true,
    },
    {
      icon: 'pick-up',
      title: 'Pick-up',
      description: 'Staff pick up goods',
      time: '5:00AM 20/03/2022',
      is_complete: true,
    },
    {
      icon: 'car',
      title: 'Sending Order',
      description: 'Item is being shipped',
      time: '5:00AM 20/03/2022',
      is_complete: true,
    },
    {
      icon: 'delivered',
      title: 'Delivered',
      description: 'Item has been delivered successfully',
    },
  ];

  return (
    <Container>
      <TopNavigation
        title={t('order:order_tracking')}
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="search" />}
      />
      <Content isPadding contentContainerStyle={{ paddingBottom: bottomButton }}>
        <TitleBar
          title={t('order:order_id', { id: '#A203VI' })}
          accessoryRight={{
            title: t('order:change_location'),
            onPress: () => navigate('Product', { screen: 'MyAddress' }),
          }}
        />
        <ShippingDetailsItem icon="location" description={address.address} />
        <Text category="h6" marginBottom={16}>
          {t('common:track_order')}
        </Text>
        {data.map((i, index) => {
          return <TrackOrderItem item={i} key={index} is_first={index === 0} />;
        })}
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

export default OrderTracking;

const styles = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 8,
  },
});
