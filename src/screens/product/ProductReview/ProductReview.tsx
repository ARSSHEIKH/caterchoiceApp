import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, NavigationAction, Text, TitleBar } from 'components';
import { useTheme, Layout, TopNavigation, Button } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import SvgStar from 'assets/svgs/SvgStar';
import RateItem from './components/RateItem';
import ReviewItem from 'components/ReviewItem';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { ReviewFragment } from 'constants/types';
import { ProductStackParamList } from 'navigation/types';

const ProductReview = React.memo(() => {
  const theme = useTheme();
  const { bottom } = useLayout();
  const { t } = useTranslation(['common', 'review']);
  const { navigate } = useNavigation<NavigationProp<ProductStackParamList>>();

  const data_rate = [
    { star: 1, rate: 25.8 / 215 },
    { star: 2, rate: 17.2 / 215 },
    { star: 3, rate: 68.8 / 215 },
    { star: 4, rate: 53.75 / 215 },
    { star: 5, rate: 49.45 / 215 },
  ];

  const data_reviews: ReviewFragment[] = [
    {
      User: {
        avatar: Images.avatar_2,
        name: 'Alex Palete',
      },
      review: `Compelling product s don't just descriptions don't just convey what your product is, but why a customer should buy it.`,
      time: '2 days ago',
      rate: 4,
    },
    {
      User: {
        avatar: Images.avatar,
        name: 'Alex Palete',
      },
      review: `Featuring a stonewashed effect, Louis Vuitton’s new denim collection recreates the iconic Monogram motif with a jacquard technique.`,
      time: '2 days ago',
      rate: 4,
    },
    {
      User: {
        avatar: Images.avatar_1,
        name: 'Alex Palete',
      },
      review: `Compelling product s don't just descriptions don't just convey what your product is, but why a customer should buy it.`,
      time: '2 days ago',
      rate: 4,
    },
  ];

  const listHeaderComponent = React.useCallback(() => {
    return (
      <View>
        <Layout level="2" style={styles.box}>
          <View style={styles.flexOne}>
            <Text category="h3">
              4
              <Text category="h6" status="sub">
                /5
              </Text>
            </Text>
            <View style={styles.starView}>
              {Array(5)
                .fill(5)
                .map((i, idx) => {
                  return (
                    <SvgStar
                      key={idx}
                      fill={idx < 4 ? theme['color-yellow-500'] : theme['text-sub-color']}
                      style={{ marginRight: 4 }}
                    />
                  );
                })}
            </View>
            <Text category="c3" status="body" marginTop={8}>
              {t('review:reviewer', { number: 215 })}
            </Text>
          </View>
          <View style={styles.flexOne}>
            {data_rate.map((i, idx) => {
              return <RateItem key={idx} item={i} style={{ marginRight: 4 }} />;
            })}
          </View>
        </Layout>
        <TitleBar
          marginTop={24}
          marginBottom={16}
          title={t('review:review_user')}
          accessoryRight={{
            title: t('common:view_all'),
            onPress: () => {},
          }}
        />
      </View>
    );
  }, []);

  const renderItem = React.useCallback(({ item }: { item: ReviewFragment }) => {
    return <ReviewItem item={item} style={styles.item} />;
  }, []);

  return (
    <Container>
      <TopNavigation title={t('common:review')} accessoryLeft={<NavigationAction />} />
      <FlatList
        data={data_reviews || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <Layout style={[styles.bottomView, { paddingBottom: bottom + 16 }]}>
        <Button children={t('review:add_a_review')} onPress={() => navigate('ProductReviewNew')} />
      </Layout>
    </Container>
  );
});

export default ProductReview;

const styles = StyleSheet.create({
  starView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  box: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
  },
  flexOne: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 72,
  },
  item: {
    marginBottom: 12,
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
