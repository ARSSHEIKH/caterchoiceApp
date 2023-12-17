import React from 'react';
import { Container, NavigationAction, TabItem, Text } from 'components';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme, TopNavigation, Layout } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { useDrawer, useLayout } from 'hooks';
import { useForm } from 'react-hook-form';

import BigList from 'react-native-big-list';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import BannerCategories from './components/BannerCategories';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { data_banner_categories } from 'constants/data';

type FormValues = {
  header_index: number;
  category_index: number;
};

const CategoriesScreen = React.memo(() => {
  const theme = useTheme();
  const { openDrawer } = useDrawer();
  const { width, bottom } = useLayout();
  const { t } = useTranslation(['common', 'categories']);

  const refScroll = React.useRef<FlatList>(null);

  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const { setValue, watch } = useForm<FormValues>({
    defaultValues: {
      header_index: 0,
      category_index: 0,
    },
  });

  React.useEffect(() => {
    refScroll.current?.scrollToIndex({
      index: watch('header_index'),
      animated: true,
      viewPosition: 0.5,
    });
  }, [watch('header_index')]);

  const header_tabs = [
    t('categories:men'),
    t('categories:women'),
    t('categories:kids'),
    t('categories:big_size'),
    t('categories:men'),
    t('categories:women'),
    t('categories:kids'),
    t('categories:big_size'),
  ];

  const category_tabs = [
    t('common:top'),
    t('common:bottom'),
    t('common:shoes'),
    t('common:accessory'),
    t('common:new_arrival'),
    t('common:tet_holiday'),
    t('common:merry_chirstmas'),
    t('common:gift'),
  ];

  const renderTabs = React.useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return (
        <TabItem
          title={item}
          onPress={() => setValue('header_index', index)}
          isSelected={watch('header_index') === index}
          style={styles.tab}
        />
      );
    },
    [watch('header_index')]
  );

  const renderCategoryTabs = React.useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setValue('category_index', index)}
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: theme['color-basic-300'],
            paddingBottom: 4,
          }}>
          <Animated.View
            style={[
              {
                width: 2,
                backgroundColor: watch('category_index') === index ? '#121314' : 'transparent',
              },
            ]}
          />
          <View style={styles.content}>
            <Text status="content" category="c1" uppercase>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [watch('category_index')]
  );

  const sections = [
    [
      {
        label: 'Popular for you',
        data: {
          name: 'All Items',
          image: Images.all_item,
        },
      },
      {
        label: 'Popular for you',
        data: {
          name: 'Best Saler',
          image: Images.best_seler,
        },
      },
      {
        label: 'Popular for you',
        data: {
          name: 'Popular',
          image: Images.popular,
        },
      },
    ],
    [
      {
        label: 'All sorts of',
        data: {
          name: 'Long Tee',
          image: Images.long_tee,
        },
      },
      {
        label: 'All sorts of',
        data: {
          name: 'Polo',
          image: Images.polo,
        },
      },
      {
        label: 'All sorts of',
        data: {
          name: 'Mangto',
          image: Images.mangto,
        },
      },
      {
        label: 'All sorts of',
        data: {
          name: 'Mangto',
          image: Images.jacket,
        },
      },
      {
        label: 'All sorts of',
        data: {
          name: 'Mangto',
          image: Images.blaze,
        },
      },
      {
        label: 'All sorts of',
        data: {
          name: 'Mangto',
          image: Images.sweater,
        },
      },
    ],
    [
      {
        label: 'Special Design',
        data: {
          name: 'Jacket',
          image: Images.polo,
        },
      },
      {
        label: 'Special Design',
        data: {
          name: 'Blaze',
          image: Images.mangto,
        },
      },
      {
        label: 'Special Design',
        data: {
          name: 'Sweater',
          image: Images.long_tee,
        },
      },
    ],
  ];

  const renderBanner = React.useCallback(({ item }) => {
    return <BannerCategories item={item} />;
  }, []);

  const renderHeader = React.useCallback(() => {
    return (
      <View>
        <Carousel
          data={data_banner_categories || []}
          renderItem={renderBanner}
          onSnapToItem={setActiveIndex}
          width={width - (119 + 16 * 2)}
          snapEnabled
          loop={false}
          enabled
        />
        <View style={styles.dotView}>
          {data_banner_categories.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.dot1,
                  {
                    backgroundColor:
                      index === activeIndex
                        ? theme['color-primary-500']
                        : theme['color-basic-1300'],
                    width: index === activeIndex ? 16 : 8,
                    marginRight: index < data_banner_categories.length - 1 ? 4 : 0,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  }, [activeIndex]);

  const renderSectionHeader = (index: number) => {
    return (
      <Layout>
        <Text category="c3" status="placeholder" marginTop={16} marginBottom={8}>
          {sections[index][0].label}
        </Text>
      </Layout>
    );
  };

  const renderItem = React.useCallback(({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          {
            width: (width - (117 + 16 * 2 + 16)) / 3,
          },
        ]}>
        <View
          style={{
            aspectRatio: 1 / 1,
            borderRadius: 4,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: item.data.image }} style={{ width: '100%', height: '100%' }} />
        </View>
        <Text category="c5" marginTop={4} center>
          {item.data.name}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Container>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="menu" onPress={openDrawer} />}
        accessoryRight={() => <NavigationAction icon="search" onPress={() => {}} />}
        title={t('categories:categories').toString()}
      />
      <View>
        <FlatList
          ref={refScroll}
          style={{ flexGrow: 0 }}
          data={header_tabs}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderTabs}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.left}>
          <FlatList
            data={category_tabs}
            renderItem={renderCategoryTabs}
            keyExtractor={keyExtractor}
            style={{ backgroundColor: theme['background-basic-color-10'] }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.right}>
          <BigList
            sections={sections}
            renderItem={renderItem}
            renderHeader={renderHeader}
            numColumns={3}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={false}
            itemHeight={102}
            headerHeight={134}
            sectionHeaderHeight={40}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.rightContent, { paddingBottom: bottom + 24 }]}
          />
        </View>
      </View>
    </Container>
  );
});

export default CategoriesScreen;

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
    marginLeft: 8,
    height: 48,
    justifyContent: 'center',
  },
  dot1: {
    width: 6,
    height: 2,
    borderRadius: 6 / 2,
    marginTop: 4,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  left: {
    width: 119,
  },
  right: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dotView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    paddingLeft: 16,
  },
  rightContent: {
    paddingTop: 16,
  },
});
