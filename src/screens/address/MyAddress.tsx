import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { AddressItem, Container, NavigationAction } from 'components';
import { Button, Layout, TopNavigation } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'store/store';
import { useLayout } from 'hooks';

import keyExtractor from 'utils/keyExtractor';
import { AddressFragment } from 'constants/types';
import { setAddress } from 'store/slices/addressSlice';
import { RootStackParamList } from 'navigation/types';

const MyAddress = React.memo(() => {
  const dispatch = useAppDispatch();
  const { goBack, navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation(['common', 'address']);
  const { bottom, bottomButton } = useLayout();

  const data: AddressFragment[] = [
    {
      name_address: 'My Home',
      address: 'Shop 03&04, TTTM BigC, 222 Đ. Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội 11313',
      phone_number: '024 6658 2992',
      is_default: true,
    },
    {
      name_address: 'My office',
      address:
        'Toa nha Lotte Cinemax, Tầng 3 Big C, 222 Đ. Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội',
      phone_number: '024 3945 4999',
    },
    {
      name_address: 'Khanh’s Home',
      address: 'Athena Tầng 5-6 Keangnam Hanoi Landmark Tower, Phạm Hùng, Mễ Trì, Cầu Giấy, Hà Nội',
      phone_number: '028 3775 2524',
    },
  ];

  const handleSubmit = React.useCallback(() => {
    goBack();
  }, []);

  const renderItem = React.useCallback(({ item }: { item: AddressFragment }) => {
    return (
      <AddressItem
        item={item}
        enabled
        style={styles.item}
        onPress={() => {
          dispatch(setAddress(item));
          goBack();
        }}
      />
    );
  }, []);

  return (
    <Container>
      <TopNavigation
        title={t('address:my_address')}
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <NavigationAction
            icon="plus"
            onPress={() => navigate('Product', { screen: 'AddAddress' })}
          />
        }
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.contentContainerStyle, { paddingBottom: bottomButton }]}
      />
      <Layout style={[styles.bottomView, { paddingBottom: bottom + 16 }]}>
        <Button children={t('common:submit')} onPress={handleSubmit} />
      </Layout>
    </Container>
  );
});

export default MyAddress;

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
    marginRight: 16,
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
  bottomView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 8,
  },
});
