import React from 'react';
import { FlatList } from 'react-native';
import { AnimatedAppearance, Container, NavigationAction } from 'components';
import { TopNavigation } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import TermItem from './components/TermItem';

import keyExtractor from 'utils/keyExtractor';
import { Animation_Types_Enum, TermSpec } from 'constants/types';

const TermOfUseScreen = React.memo(() => {
  const { bottom } = useLayout();
  const { t } = useTranslation(['common', 'term_of_use']);

  const data: TermSpec[] = [
    {
      title: t('term_of_use:about_you'),
      description: t('term_of_use:about_us'),
    },
    {
      title: t('Procedures & Policies'),
      description: t('term_of_use:procedures_policies'),
    },
    {
      title: t('Order Placement Policy'),
      description: t('term_of_use:order_placement_policy'),
    },
    {
      title: t('Delivery Policy'),
      description: t('term_of_use:delivery_policy'),
    },
    {
      title: t('Price Policy'),
      description: t('term_of_use:price_policy'),
    },
    {
      title: t('Warranty Policy'),
      description: t('term_of_use:warranty_policy'),
    },
    {
      title: t('Payment Policy'),
      description: t('term_of_use:payment_policy'),
    },
    {
      title: t('Privacy Policy'),
      description: t('term_of_use:privacy_policy'),
    },
  ];

  const renderListCategory = React.useCallback(
    ({ item, index }: { item: TermSpec; index: number }) => {
      return (
        <AnimatedAppearance type={Animation_Types_Enum.SlideBottom} index={index}>
          <TermItem item={item} />
        </AnimatedAppearance>
      );
    },
    []
  );

  return (
    <Container>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title={t('term_of_use:term_of_use')}
      />
      <FlatList
        data={data || []}
        renderItem={renderListCategory}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 16 }}
      />
    </Container>
  );
});

export default TermOfUseScreen;
