import React from 'react';
import { StyleSheet, FlatList, Alert, Pressable } from 'react-native';
import { TopNavigation } from '@ui-kitten/components';
import { CollectionItem, Container, Content, NavigationAction, Text } from 'components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDrawer, useLayout } from 'hooks';

import keyExtractor from 'utils/keyExtractor';
import { ICategoryItemState } from 'constants/types';
import { RootStackParamList } from 'navigation/types';
import { new_collections, popular_collections } from 'constants/data';
import {fetchCategory, categorySelector} from "../../../store/slices/categorySlice";
import { useAppDispatch, useAppSelector } from 'store/store';

const CollectionScreen = React.memo(() => {
  const { openDrawer } = useDrawer();
  const { width, bottom } = useLayout();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'collection']);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const {category} = useAppSelector(categorySelector);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const category = async () => {
      setLoading(true);
      const json = await dispatch(fetchCategory());
      setLoading(false);
    }
    category();

  }, []);

  const renderCollectionItem = React.useCallback(
    ({ item }: { item: ICategoryItemState }) => {
      return loading ? (
        <CollectionItem.Loading />
      ) : (
        <CollectionItem
          item={item}
          onPress={() => navigate('Product', { screen: 'ProductGrid',  params:{category:item}  })}
        />
      );
    },
    [loading]
  );

  return (
    <Container>
      <TopNavigation
        title={t('collection:Category').toString()}
        accessoryLeft={<NavigationAction icon="menu" onPress={openDrawer} />}
        // accessoryRight={<NavigationAction icon="option" onPress={() => {}} />}
      />
      <Content contentContainerStyle={{ paddingBottom: bottom + 24 }}>
        {category.map((item, index)=>{
           const total = (item.sub || []).reduce(
            (prevValue, currentValue) => prevValue + currentValue.product_count,
            0
          );
          return <React.Fragment key={index}>
          {total>0 &&
          <>
          <Pressable onPress={() => navigate('Product', { screen: 'ProductGrid', params:{category:item} })} >
          <Text category="h6" marginLeft={16} marginTop={24} marginBottom={8}>
            {item.name} ({total})
          </Text>
          </Pressable>
          <FlatList
            data={item.sub || []}
            horizontal
            renderItem={renderCollectionItem}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            scrollEventThrottle={16}
            snapToInterval={width - (24 + 84 - 12)}
            bounces={false}
            pagingEnabled={false}
            decelerationRate="fast"
          />
          </>
          }
          </React.Fragment>
        })}
      
      </Content>
    </Container>
  );
});

export default CollectionScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingLeft: 8,
  },
});
