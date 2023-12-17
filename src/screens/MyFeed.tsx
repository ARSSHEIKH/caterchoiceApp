import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TopNavigation } from '@ui-kitten/components';
import { Container, NavigationAction, NewsFeedItem } from 'components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDrawer } from 'hooks';

import keyExtractor from 'utils/keyExtractor';
import { data_news_feed } from 'constants/data';
import { NewsFeedFragment } from 'constants/types';
import { RootStackParamList } from 'navigation/types';

const MyFeed = React.memo(() => {
  const { openDrawer } = useDrawer();
  const { t } = useTranslation('common');

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const renderItem = React.useCallback(({ item }: { item: NewsFeedFragment }) => {
    return (
      <NewsFeedItem
        item={item}
        style={styles.item}
        onPress={() => navigate('ImageDetail', { images: item.images })}
      />
    );
  }, []);

  return (
    <Container>
      <TopNavigation
        title={t('my_feed').toString()}
        accessoryLeft={<NavigationAction icon="menu" onPress={openDrawer} />}
        accessoryRight={<NavigationAction icon="notification" onPress={() => {}} />}
      />
      <FlatList
        data={data_news_feed}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
      />
    </Container>
  );
});

export default MyFeed;

const styles = StyleSheet.create({
  item: {
    marginBottom: 24,
  },
  contentContainer: {
    paddingTop: 24,
  },
});
