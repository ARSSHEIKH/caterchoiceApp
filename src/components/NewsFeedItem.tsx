import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, FlatList, ViewStyle } from 'react-native';
import { Avatar, Icon } from '@ui-kitten/components';
import { useLayout } from 'hooks';

import Text from './Text';
import TimeItem from './TimeItem';

import { BlurView } from '@react-native-community/blur';
import keyExtractor from 'utils/keyExtractor';
import { ImageFragment, NewsFeedFragment } from 'constants/types';

interface NewsFeedItemProps {
  style?: ViewStyle;
  item: NewsFeedFragment;
  onPress?(): void;
}

const NewsFeedItem: React.FC<NewsFeedItemProps> = ({ style, item, onPress }) => {
  const { width } = useLayout();

  const {
    User: { name, avatar },
    description,
    time,
    images,
  } = item;

  const renderItem = React.useCallback(
    ({ item: _item, index }: { item: ImageFragment; index: number }) => {
      return index !== 0 ? (
        <TouchableOpacity activeOpacity={0.7} style={styles.image1} onPress={onPress}>
          {_item.image_url && <Image source={{ uri: _item.image_url }} style={styles.image} />}
        </TouchableOpacity>
      ) : (
        <View />
      );
    },
    []
  );

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container, style]} onPress={onPress}>
      <View style={styles.header}>
        <Avatar size="48" source={{ uri: avatar }} />
        <View style={styles.content}>
          <Text category="t1">{name}</Text>
          <TimeItem time={time} marginTop={4} />
        </View>
        <TouchableOpacity style={styles.option}>
          <Icon pack="assets" name="option" />
        </TouchableOpacity>
      </View>
      <Text
        category="b1"
        status="description"
        marginTop={16}
        marginHorizontal={16}
        marginBottom={12}>
        {description}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.imageView, { width: width }]}
        onPress={onPress}>
        <Image source={{ uri: images[0].image_url }} style={styles.image} />
        <BlurView blurAmount={20} style={styles.row}>
          <View style={styles.row1}>
            <Icon pack="assets" name="heart-fill" style={styles.icon20} />
            <Text marginLeft={8} category="b2" status="white">
              {images[0].likes}
            </Text>
          </View>
          <View style={styles.row2}>
            <Icon pack="assets" name="message" style={styles.icon20} />
            <Text marginLeft={8} category="b2" status="white">
              {images[0].comments}
            </Text>
          </View>
        </BlurView>
      </TouchableOpacity>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </TouchableOpacity>
  );
};

export default NewsFeedItem;

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  option: {
    width: 24,
    height: 24,
  },
  imageView: {
    aspectRatio: 1 / 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon20: {
    width: 20,
    height: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingTop: 4,
    paddingLeft: 4,
  },
  image1: {
    aspectRatio: 1 / 1,
    width: 77,
    marginRight: 4,
  },
});
