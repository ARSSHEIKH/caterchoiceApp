import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { CardItem, Container, Content, NavigationAction } from 'components';
import { Button, Input, Layout, TopNavigation } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { CardFragment } from 'constants/types';

interface FormValues {
  card_number: string;
  name: string;
  expiry_date: string;
  security_code: string;
}

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

const AddCard = React.memo(() => {
  const { goBack } = useNavigation();
  const { t } = useTranslation(['common', 'card']);
  const { width, top, bottom } = useLayout();

  const { control } = useForm<FormValues>({
    defaultValues: {
      card_number: '**** **** **** 0329',
      name: 'LE THANH HAI',
      expiry_date: '06/30',
      security_code: '***',
    },
  });

  const renderCard = React.useCallback(({ item }: { item: CardFragment }) => {
    return <CardItem item={item} style={{ width: width - 36 * 2, marginRight: 16 }} />;
  }, []);

  return (
    <Container useSafeArea={false}>
      <Layout style={{ paddingTop: top }}>
        <TopNavigation
          appearance="control"
          title={t('card:add_new_card')}
          accessoryLeft={<NavigationAction />}
        />
      </Layout>
      <Content level="2">
        <View>
          <FlatList
            data={data_card || []}
            renderItem={renderCard}
            keyExtractor={keyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToInterval={width - 36 * 2}
            bounces={false}
            pagingEnabled={false}
            decelerationRate="fast"
            contentContainerStyle={styles.contentContainer}
          />
          {/* <View style={styles.dotView}>
            {data_card.map((item, idx) => {
              return (
                <View
                  key={idx}
                  style={[
                    styles.dot1,
                    {
                      backgroundColor:
                        activeIndex === idx
                          ? theme['color-primary-500']
                          : theme['color-basic-1300'],
                      width: activeIndex === idx ? 27 : 6,
                      marginRight: idx < data_card.length - 1 ? 4 : 0,
                    },
                  ]}
                />
              );
            })}
          </View> */}
        </View>
        <Layout style={styles.box}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                label={t('card:card_number')}
                onBlur={onBlur}
                onChangeText={onChange}
                textStyle={styles.textStyle}
                status="card"
              />
            )}
            name="card_number"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                textStyle={styles.textStyle}
                status="card"
                style={styles.input}
                label={t('card:name_on_card')}
              />
            )}
            name="name"
            rules={{ required: true }}
          />
          <View style={styles.row}>
            <View style={styles.left}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('card:expiry_date')}
                    textStyle={styles.textStyle}
                    status="card"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
                name="expiry_date"
                rules={{ required: true }}
              />
            </View>
            <View style={styles.right}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('card:security_code')}
                    textStyle={styles.textStyle}
                    status="card"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
                name="security_code"
                rules={{ required: true }}
              />
            </View>
          </View>
        </Layout>
      </Content>
      <Layout style={[styles.bottomView, { paddingBottom: bottom + 16 }]}>
        <Button children={t('common:save_card')} onPress={goBack} />
      </Layout>
    </Container>
  );
});

export default AddCard;

const styles = StyleSheet.create({
  box: {
    padding: 20,
    borderRadius: 12,
    marginTop: 24,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  textStyle: {
    height: '100%',
  },
  left: {
    flex: 1,
    marginRight: 20,
  },
  right: {
    flex: 1,
  },
  input: {
    marginTop: 20,
  },
  bottomView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 8,
  },
  dotView: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dot1: {
    height: 6,
    borderRadius: 6 / 2,
  },
  contentContainer: {
    paddingLeft: 16,
    paddingTop: 24,
  },
});
