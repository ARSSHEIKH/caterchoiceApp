import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container, MyCardItem, NavigationAction, Text } from 'components';
import { useTheme, Button, Layout, TopNavigation, Icon } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { CardFragment } from 'constants/types';
import { ProductStackParamList } from 'navigation/types';

const data_card: CardFragment[] = [
  {
    name: 'Jenny Wilson',
    card_number: 1234567898760329,
    exp_date: '03/24',
    image: Images.card_1,
  },
  {
    name: 'Jenny Wilson',
    card_number: 1234567898760329,
    exp_date: '03/24',
    image: Images.card_2,
  },
  {
    name: 'Jenny Wilson',
    card_number: 1234567898760329,
    exp_date: '03/24',
    image: Images.card_1,
  },
];

const MyCard = React.memo(() => {
  const theme = useTheme();
  const { goBack, navigate } = useNavigation<NavigationProp<ProductStackParamList>>();
  const { t } = useTranslation(['common', 'card']);
  const { top, bottom, bottomButton } = useLayout();

  const listHeaderComponent = React.useCallback(() => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.box1, { borderColor: theme['background-basic-color-5'] }]}
        onPress={() => navigate('AddCard')}>
        <Icon pack="assets" name="card" />
        <Text marginLeft={12} category="h6" status="placeholder">
          {t('card:add_new_card')}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  const renderCard = React.useCallback(({ item }: { item: CardFragment }) => {
    return <MyCardItem item={item} style={{ marginBottom: 24 }} />;
  }, []);

  return (
    <Container useSafeArea={false}>
      <Layout style={{ paddingTop: top }}>
        <TopNavigation
          appearance="control"
          title={t('card:my_card')}
          accessoryLeft={<NavigationAction />}
        />
      </Layout>
      <FlatList
        data={data_card}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
        style={{ backgroundColor: theme['background-basic-color-2'] }}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: bottomButton }]}
        ListHeaderComponent={listHeaderComponent}
      />
      <Layout style={[styles.bottomView, { paddingBottom: bottom + 16 }]}>
        <Button children={t('common:save_card')} onPress={goBack} />
      </Layout>
    </Container>
  );
});

export default MyCard;

const styles = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 8,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  box: {
    marginBottom: 24,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  box1: {
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 32,
    borderStyle: 'dashed',
    marginBottom: 24,
  },
});
