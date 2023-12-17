import React from 'react';
import { BlogItem } from 'components';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useLayout } from 'hooks';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { BlogFragment } from 'constants/types';
import { RootStackParamList } from 'navigation/types';

export const data = [
  {
    image: Images.image19,
    title: `Expressed through look Alessandro Michele's`,
    time: '10 days ago',
  },
  {
    image: Images.image18,
    title: 'Curved half-moon shape and its defining...',
    time: '9 days ago',
  },
  {
    image: Images.image25,
    title: `Expressed through look Alessandro Michele's`,
    time: '10 days ago',
  },
];

const Host24h: React.FC = () => {
  const { width } = useLayout();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const renderItem = React.useCallback(({ item }: { item: BlogFragment }) => {
    return <BlogItem item={item} style={styles.item} onPress={() => navigate('BlogDetails')} />;
  }, []);

  return (
    <View style={[styles.container, { width: width }]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default Host24h;

const styles = StyleSheet.create({
  container: {},
  item: {
    marginBottom: 16,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
