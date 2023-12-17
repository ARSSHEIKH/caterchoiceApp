import React from 'react';
import { TopNavigation } from '@ui-kitten/components';
import { StyleSheet, FlatList, ScrollView } from 'react-native';
import { Container, Content, NavigationAction, PostItem, TabBar, TitleBar } from 'components';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useDrawer, useLayout } from 'hooks';

import Host24h from './components/Hot24h';
import Trendy from './components/Trendy';

import { Images } from 'assets/images';
import { BlogFragment } from 'constants/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/types';

const data_post: BlogFragment[] = [
  {
    image: Images.image24,
    title: 'The New Sustainable Popular Collection',
    time: '8 days ago',
  },
  {
    image: Images.image25,
    title: 'Dakota Horsebit 1955 shoulder bag',
    time: '10 days ago',
  },
  {
    image: Images.image15,
    title: 'The New Sustainable Popular Collection',
    time: '8 days ago',
  },
];

const BlogFashion = React.memo(() => {
  const { width } = useLayout();
  const { openDrawer } = useDrawer();
  const { t } = useTranslation(['common', 'blog']);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const translationX = useSharedValue(0);
  const scrollRef = useAnimatedRef<ScrollView>();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ x: width * selectedIndex });
  }, [selectedIndex]);

  const renderItem = React.useCallback(({ item }: { item: BlogFragment }) => {
    return <PostItem item={item} style={styles.item} onPress={() => navigate('BlogDetails')} />;
  }, []);

  return (
    <Container>
      <TopNavigation
        title={t('blog:blog_fashion')}
        accessoryLeft={<NavigationAction icon="menu" onPress={openDrawer} />}
        accessoryRight={<NavigationAction icon="search" onPress={() => {}} />}
      />
      <Content>
        <TitleBar
          paddingHorizontal={16}
          marginBottom={8}
          title={t('blog:post_for_you')}
          accessoryRight={{ title: t('common:view_all') }}
        />
        <FlatList
          data={data_post}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width - 119}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          contentContainerStyle={styles.contentContainer}
        />
        <TabBar
          data={[t('blog:hot_24h'), t('blog:trendy')]}
          selectedTab={selectedIndex}
          onPress={setSelectedIndex}
          style={styles.tab}
        />
        <Animated.ScrollView
          ref={scrollRef as any}
          horizontal
          snapToAlignment="center"
          decelerationRate="fast"
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          bounces={false}
          pagingEnabled={false}
          style={{ width: width }}
          contentContainerStyle={{ width: width * 2 }}>
          <Host24h />
          <Trendy />
        </Animated.ScrollView>
      </Content>
    </Container>
  );
});

export default BlogFashion;

const styles = StyleSheet.create({
  item: {
    marginRight: 16,
  },
  contentContainer: {
    paddingLeft: 16,
  },
  tab: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  viewPager: {
    flex: 1,
  },
});
