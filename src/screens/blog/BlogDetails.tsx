import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import {
  Container,
  NavigationAction,
  ProductHorizontal,
  ProductItem,
  TagItem,
  Text,
  TimeItem,
  TitleBar,
} from 'components';
import { TopNavigation } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { ProductFragment } from 'constants/types';
import { data_tags, products_list, recent_list } from 'constants/data';
import { RootStackParamList } from 'navigation/types';

const BlogDetails = React.memo(() => {
  const { width, bottom, top } = useLayout();
  const { t } = useTranslation(['common', 'blog']);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <View>
        <View style={styles.box2}>
          <Image style={styles.image} source={{ uri: Images.image26 }} />
        </View>
        <Text category="h5" marginHorizontal={16} marginTop={16}>
          The New Sustainable Popular Collection Summer
        </Text>
        <TimeItem time={'8 days ago'} marginTop={12} marginLeft={16} />
        <Text category="b1" status="body" marginHorizontal={16} marginTop={16} marginBottom={24}>
          From our favourite UK influencers to the best missives from Milan and the coolest New
          Yorkers, rt, do head to our separate black fashion influencer round-up.
        </Text>
        <View style={styles.box}>
          <View style={styles.box1}>
            <Image source={{ uri: Images.image28 }} style={styles.image1} />
          </View>
          <View>
            <View style={styles.image2}>
              <Image source={{ uri: Images.long_tee }} style={styles.image} />
            </View>
            <View style={[styles.image2, { marginTop: 12 }]}>
              <Image source={{ uri: Images.image27 }} style={styles.image} />
            </View>
          </View>
        </View>
        <Text category="b1" status="body" marginHorizontal={16}>
          Another Northern lass, a former physiotherapist turned fashion influencer and podcast
          host, alongside her best friend Lizzy Hadfield.
        </Text>
        <Text category="b1" status="body" marginTop={24} marginHorizontal={16}>
          Though she does cleverly weave in more trend-led pieces into her wardrobe, such as the By
          Far glitter Rachel bag and must-have Wandler mules. I’m also here for a powerful female
          friendship.
        </Text>
        <Text marginTop={24} category="t1" marginBottom={8} marginLeft={16}>
          {t('common:tags')}
        </Text>
        <View style={styles.row1}>
          {data_tags.map((i, idx) => {
            return <TagItem item={i} key={idx} style={styles.tag} />;
          })}
        </View>
        <TitleBar
          title={t('blog:product_on_post')}
          accessoryRight={{
            title: t('common:view_all'),
            onPress: () => {},
          }}
          paddingHorizontal={16}
          marginTop={12}
          marginBottom={16}
        />
      </View>
    );
  }, []);

  const renderItem = React.useCallback(
    ({ item, index }: { item: ProductFragment; index: number }) => {
      return loading ? (
        <ProductItem.Loading
          style={{
            width: (width - 48) / 2,
            marginLeft: index % 2 !== 0 ? 8 : 16,
            marginRight: index % 2 !== 0 ? 16 : 8,
            marginBottom: 16,
          }}
        />
      ) : (
        <ProductItem
          style={{
            width: (width - 48) / 2,
            marginLeft: index % 2 !== 0 ? 8 : 16,
            marginRight: index % 2 !== 0 ? 16 : 8,
            marginBottom: 16,
          }}
          item={item}
          onPress={() => navigate('Product', { screen: 'ProductDetails' })}
        />
      );
    },
    [loading]
  );

  const listFooterComponent = React.useCallback(() => {
    return (
      <View style={styles.padding}>
        <TitleBar
          marginTop={32}
          title={t('blog:recommend')}
          accessoryRight={{
            title: t('common:view_all'),
            onPress: () => {},
          }}
        />
        {recent_list.map((item, index) => {
          return loading ? (
            <ProductHorizontal.Loading key={index} style={styles.productHorizontal} />
          ) : (
            <ProductHorizontal
              item={item}
              key={index}
              style={styles.productHorizontal}
              onPress={() => navigate('Product', { screen: 'ProductDetails' })}
            />
          );
        })}
      </View>
    );
  }, [loading]);

  return (
    <Container useSafeArea={false}>
      <FlatList
        data={products_list}
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeaderComponent}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: bottom }}
        ListFooterComponent={listFooterComponent}
      />
      <TopNavigation
        style={[styles.header, { top }]}
        appearance="control"
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction marginLeft={12} icon="share" onPress={() => {}} />}
      />
    </Container>
  );
});

export default BlogDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  padding: {
    paddingHorizontal: 16,
  },
  productHorizontal: {
    marginBottom: 12,
  },
  row1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  tag: {
    marginRight: 8,
  },
  image1: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image2: {
    aspectRatio: 1 / 1,
    width: 90,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  box1: {
    flex: 1,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  box: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  icon: {
    width: 16,
    height: 16,
  },
  box2: {
    width: '100%',
    aspectRatio: 1 / 1,
  },
  header: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
});
