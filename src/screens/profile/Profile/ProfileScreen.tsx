import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  CategoryItem,
  Container,
  Content,
  FocusAwareStatusBar,
  NavigationAction,
  TabBar,
  Text,
  TitleBar,
} from 'components';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme, Avatar, TopNavigation } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAppBottomSheet, useDrawer, useLayout } from 'hooks';

import Wishlist from './components/Wishlist';
import RecentView from './components/RecentView';

import { Images } from 'assets/images';
import { BlurView } from '@react-native-community/blur';
import { CategoryFragment } from 'constants/types';
import { RootStackParamList } from 'navigation/types';

import {userSelector} from "../../../store/slices/userSlice";
import {fetchProduct, productSelector} from "../../../store/slices/productSlice";
import { useAppDispatch, useAppSelector } from 'store/store';
import { fetchWishlist } from 'store/slices/wishlistSlice';


const ProfileScreen = React.memo(() => {
  const theme = useTheme();
  const { openDrawer } = useDrawer();
  const { expand } = useAppBottomSheet();
  const { width, top, bottomButton } = useLayout();
  const { t } = useTranslation(['common', 'profile']);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const translationX = useSharedValue(0);
  const dispatch = useAppDispatch();
  const scrollRef = useAnimatedRef<ScrollView>();

  const {user} = useAppSelector(userSelector);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ x: width * selectedIndex });
    const product = async () => {
      dispatch(fetchWishlist(user?.access_token));
    }
    product();
  }, [selectedIndex]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchWishlist(user?.access_token));
    }, [])
  );

  const data = [
    {
      title: t('common:point'),
      content: 195,
    },
    {
      title: t('common:coupon'),
      content: 20,
    },
    {
      title: t('common:voucher'),
      content: 8,
    },
  ];

  const data_categories: CategoryFragment[] = [
    {
      id: '0',
      color: '#FFBC99',
      name: t('common:upload'),
      icon: 'upload',
    },
    {
      id: '1',
      color: '#B1E5FC',
      name: t('common:processing'),
      icon: 'processing',
    },
    {
      id: '2',
      color: '#B5E4CA',
      name: t('common:shipping'),
      icon: 'car',
    },
    {
      id: '3',
      color: '#CABDFF',
      name: t('common:review'),
      icon: 'review',
    },
    {
      id: '4',
      color: '#FFD88D',
      name: t('common:cancel'),
      icon: 'cancel',
    },
  ];

  const renderCategory = React.useCallback(
    ({ item, index }: { item: CategoryFragment; index: number }) => {
      return (
        <CategoryItem
          item={item}
          style={{ marginRight: index === data_categories.length - 1 ? 16 : 24 }}
        />
      );
    },
    []
  );

  return (
    <Container useSafeArea={false}>
      <FocusAwareStatusBar barStyle="light-content" />
      <Content contentContainerStyle={{ paddingBottom: bottomButton }}>
        <ImageBackground source={Images.profile} style={{ width: '100%', height: '100%', flex: 1 }}>
          <View style={{ paddingTop: top + 16, paddingBottom: 16 }}>
            <TopNavigation
              appearance="control"
              title={() => (
                <Text category="t1" status="white">
                  {t('profile:my_profile')}
                </Text>
              )}
              accessoryLeft={<NavigationAction icon="menu" onPress={openDrawer} status="white" />}
              // accessoryRight={<NavigationAction icon="option" status="white" onPress={expand} />}
            />
            {/* <View style={[styles.avatar, { borderColor: theme['color-basic-800'] }]}>
              <Avatar size="80" source={{ uri: Images.avatar_3 }} />
            </View> */}
            <Text category="h4" status="white" marginTop={8} center>
              {user?.data?.name}
            </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('ProfileEdit')}>
              <Text center uppercase status="sub">
                {t('profile:edit_profile')}
              </Text>
            </TouchableOpacity>
            {/* <BlurView blurAmount={20} style={styles.box1}>
              {data.map((i, idx) => {
                return (
                  <View key={idx} style={styles.box}>
                    <Text category="h6" status="white">
                      {i.content}
                    </Text>
                    <Text category="c2" status="white">
                      {i.title}
                    </Text>
                    {idx < data.length - 1 && (
                      <View
                        style={[
                          styles.line,
                          {
                            backgroundColor: theme['color-basic-600'],
                          },
                        ]}
                      />
                    )}
                  </View>
                );
              })}
            </BlurView> */}
          </View>
        </ImageBackground>
        <TitleBar
          paddingHorizontal={16}
          marginTop={24}
          marginBottom={16}
          title={t('common:my_order')}
          accessoryRight={{
            title: t('common:view_all'),
            onPress: () => navigate('Drawer', { screen: 'MyOrder' }),
          }}
        />
        {/* <View>
          <FlatList
            data={data_categories || []}
            renderItem={renderCategory}
            keyExtractor={(item, index) => `category ${item.name} ${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={styles.contentCategory}
          />
        </View> */}
        <TabBar
          data={[t('profile:wishlist'), t('common:recent_view')]}
          selectedTab={selectedIndex}
          onPress={(index) => {
            setSelectedIndex(index);
          }}
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
          <Wishlist />
          <RecentView />
        </Animated.ScrollView>
      </Content>
    </Container>
  );
});

export default ProfileScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    alignSelf: 'center',
  },
  box: {
    paddingVertical: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 1,
    borderRadius: 1,
    position: 'absolute',
    top: 24,
    bottom: 24,
    right: 0,
  },
  box1: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 24,
  },
  contentCategory: {
    paddingLeft: 16,
    marginTop: 8,
  },
  tab: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
