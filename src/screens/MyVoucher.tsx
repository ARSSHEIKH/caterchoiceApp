import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Container, NavigationAction, VoucherItem } from 'components';
import { useTheme, TopNavigation } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { useDrawer } from 'hooks';

import keyExtractor from 'utils/keyExtractor';
import { VoucherFragment } from 'constants/types';

const data: VoucherFragment[] = [
  {
    name: 'Happy Sunday',
    discount: 15,
    time: '2 days',
  },
  {
    name: 'Free Delivery',
    time: '8 days',
    is_free: true,
  },
  {
    name: 'Merry Christmas',
    discount: 30,
    time: '2 days',
  },
  {
    name: 'Happy Sunday',
    discount: 20,
    is_expired: true,
  },
  {
    name: 'Happy Sunday',
    discount: 10,
    time: '2 days',
  },
];

const MyVoucher = React.memo(() => {
  const theme = useTheme();
  const { openDrawer } = useDrawer();
  const { t } = useTranslation('common');

  const renderItem = React.useCallback(({ item }: { item: VoucherFragment }) => {
    return <VoucherItem enabled item={item} style={styles.item} />;
  }, []);

  return (
    <Container>
      <TopNavigation
        title={t('my_voucher')}
        accessoryLeft={<NavigationAction icon="menu" onPress={openDrawer} />}
        accessoryRight={<NavigationAction icon="search" onPress={() => {}} />}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        style={{ backgroundColor: theme['background-basic-color-2'] }}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Container>
  );
});

export default MyVoucher;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 24,
    paddingRight: 16,
  },
  item: {
    marginLeft: 16,
  },
});
