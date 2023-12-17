import React from 'react';
import { CategoryItem, TitleBar } from 'components';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import Banner from './Banner';

import keyExtractor from 'utils/keyExtractor';
import { data_banner, data_categories } from '../data';
import { ICategoryItemState } from 'constants/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList } from 'navigation/types';
import {fetchBanner, bannerSelector} from "../../../store/slices/bannerSlice";
import {fetchCategory, categorySelector} from "../../../store/slices/categorySlice";
import { useAppDispatch, useAppSelector } from 'store/store';



interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const { width } = useLayout();
  const { t } = useTranslation(['common', 'home']);
  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();
  const {data} = useAppSelector(bannerSelector);
  const {category} = useAppSelector(categorySelector);



  React.useEffect(() => {

    const banner = async () => {
      const json = await dispatch(fetchBanner());
      await dispatch(fetchCategory());
      
    }
    banner();
  }, []);

  const renderBanner = React.useCallback(({ item }) => {
    const { data } = item;
    return <Banner banners={data} />;
  }, []);

  const renderCategory = React.useCallback(
    ({ item, index }: { item: ICategoryItemState; index: number }) => {
      return (
        <CategoryItem
          item={item}
          style={{ marginRight: index === category.length - 1 ? 16 : 24 }}
          onPress={() => navigate('Product', { screen: 'ProductGrid',  params:{category:item}  })}
        />
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data || []}
          renderItem={renderBanner}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width - 52}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          contentContainerStyle={styles.contentBanner}
        />
      </View>
      <TitleBar
        marginTop={22}
        paddingHorizontal={16}
        title={t('common:categories')}
      />
      <View>
        <FlatList
          data={category || []}
          renderItem={renderCategory}
          keyExtractor={(item, index) => `category ${item.name} ${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.contentCategory}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  contentBanner: {
    paddingLeft: 16,
    paddingRight: 4,
  },
  row: {
    marginTop: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentCategory: {
    paddingLeft: 16,
    paddingRight: -16,
    marginTop: 8,
  },
});
