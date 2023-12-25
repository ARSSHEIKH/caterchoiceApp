import React from 'react';
import { View, Image, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme, Icon } from '@ui-kitten/components';
import { useLayout } from 'hooks';
import { useTranslation } from 'react-i18next';

import Text from './Text';
import Skeleton from './Skeleton';

import { ICategoryItemState } from 'constants/types';
import {category_uri} from "../constants/common";

interface CollectionItemProps {
  style?: ViewStyle;
  item: ICategoryItemState;
  onPress?(): void;
}

const CollectionItem = ({ style, item, onPress }: CollectionItemProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { width } = useLayout();
  const { name, image } = item;
  

  const ImageItem = ({ image, _style }: { image: string; _style?: ViewStyle }) => {
    return image ? (
      <View style={[styles.image_view, _style]}>
        <FastImage style={styles.image} resizeMode="cover" source={{uri:image}} />
      </View>
    ) : (
      <View />
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, style]}>
      <View style={{ flexDirection: 'row' }}>
        
        <ImageItem image={image} _style={{ flex: 1, marginRight: 8 }} />
        {/* <View style={[{ flex: 3.37 }]}>
          <ImageItem image={image} _style={{ marginBottom: 4 }} />
          <View style={[styles.image_view, { marginTop: 4 }]}>
            <ImageItem image={image} />
            <View
              style={[
                styles.overlay,
                {
                  backgroundColor: theme['color-primary-800'],
                },
              ]}>
              <Text category="b2" status="white">
                {t('more')}
              </Text>
            </View>
          </View>
        </View> */}
      </View>
      <Text category="b2" marginTop={12} marginHorizontal={8}>
        {name}
      </Text>
      <View style={styles.item}>
        <Icon name="diamond" pack="assets" style={styles.icon16} />
        <Text category="c2" marginLeft={8}>
          {t('items', { number: item.product_count })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Loading = ({ style }: { style?: ViewStyle }) => {
  const { width } = useLayout();

  return (
    <View style={[styles.container, { width: width - (24 + 84) }, style]}>
      <View style={{ flexDirection: 'row' }}>
        <View></View>
        <View style={[styles.image_view, { flex: 6.73, marginRight: 8 }]}>
          <Skeleton width="100%" height="100%" variant="box" />
        </View>
        <View style={[{ flex: 3.37 }]}>
          <View style={[styles.image_view, { marginBottom: 4 }]}>
            <Skeleton width="100%" height="100%" variant="box" />
          </View>
          {/* <View style={[styles.image_view, { marginTop: 4 }]}>
            <Skeleton width="100%" height="100%" variant="box" />
          </View> */}
        </View>
      </View>
      <View style={styles.nameLoading}>
        <Skeleton width="100%" height={12} />
      </View>
      <View style={styles.item}>
        <Skeleton width="80%" height={12} />
      </View>
    </View>
  );
};

CollectionItem.Loading = Loading;

export default CollectionItem;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginRight: 12,
  },
  image_view: {
    //aspectRatio: 1 / 1,
    width:120,
    height:120,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  item_view_overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  item: {
    marginTop: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameLoading: {
    marginTop: 12,
    paddingHorizontal: 8,
  },
  icon16: {
    width: 16,
    height: 16,
  },
});
