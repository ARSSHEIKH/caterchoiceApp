import React from 'react';
import { ColorItem, Text } from 'components';
import { View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme, Icon, Layout, Button } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector } from 'store/store';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import {
  filterSelector,
  setPriceFilter,
  setColorFilter,
  setRatingFilter,
  setTagsFilter,
} from 'store/slices/filterSlice';
import { data_colors } from 'constants/data';

interface FilterProps {
  onClose?(): void;
}

const Filter: React.FC<FilterProps> = ({ onClose }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { width, bottom } = useLayout();
  const { t } = useTranslation('common');
  const { priceFilter, ratingFilter, colorFilter, tagsFilter } = useAppSelector(filterSelector);

  const tags_data = [
    'Tops',
    'Bottoms',
    'Jacket',
    'Accessory',
    'Hiphop',
    'Business',
    'Shoes',
    'Free Style',
  ];

  const renderColor = React.useCallback(
    ({ item }) => {
      return (
        <ColorItem
          color={item}
          colorSelected={colorFilter}
          onPress={() => dispatch(setColorFilter(item))}
          style={styles.colorItem}
        />
      );
    },
    [colorFilter]
  );

  return (
    <View style={[styles.container, { paddingBottom: bottom + 16 }]}>
      <View style={[styles.row, { borderBottomColor: theme['background-basic-color-3'] }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={onClose} style={styles.iconView}>
          <Icon pack="assets" name="close" />
        </TouchableOpacity>
        <Text category="t1">Filter</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}} style={styles.iconView}>
          <Icon pack="assets" name="option" />
        </TouchableOpacity>
      </View>
      <Text category="t1" status="body" marginTop={24} marginLeft={32}>
        Price
      </Text>
      <MultiSlider
        values={priceFilter}
        sliderLength={width - 32 * 2}
        onValuesChangeFinish={(e) => dispatch(setPriceFilter(e))}
        containerStyle={{ alignItems: 'center', height: 21 }}
        trackStyle={{
          backgroundColor: theme['background-basic-color-3'],
          height: 4,
          borderRadius: 4,
        }}
        selectedStyle={{ backgroundColor: theme['background-basic-color-6'] }}
        min={10}
        max={1000}
        enabledTwo
        enableLabel
        customLabel={() => (
          <Text category="c2" center>
            ${priceFilter[0]} - ${priceFilter[1]}
          </Text>
        )}
        step={5}
        customMarker={() => (
          <Layout
            style={[
              styles.line,
              {
                borderColor: theme['background-basic-color-6'],
              },
            ]}
          />
        )}
      />
      <View style={styles.row1}>
        <Text category="c1" status="body">
        £10
        </Text>
        <Text category="c1" status="body">
        £1k
        </Text>
      </View>
      {/* <Text category="t1" status="body" marginTop={24} marginLeft={32}>
        Rating
      </Text>
      <View style={styles.rateView}>
        {Array(5)
          .fill(5)
          .map((i, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => dispatch(setRatingFilter(index))}
                key={index}
                style={[
                  styles.rate,
                  {
                    borderColor:
                      index === ratingFilter ? 'transparent' : theme['background-basic-color-5'],
                    backgroundColor:
                      index === ratingFilter ? theme['background-basic-color-6'] : 'transparent',
                  },
                ]}>
                <Text category="c1" status={index === ratingFilter ? 'white' : 'body'}>
                  {index + 1}
                </Text>
                <Image source={Images.star} style={styles.star} />
              </TouchableOpacity>
            );
          })}
      </View> */}
      {/* <Text category="t1" status="body" marginTop={24} marginLeft={32} marginBottom={12}>
        Select color
      </Text> */}
      {/* <View>
        <FlatList
          data={data_colors}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={renderColor}
        />
      </View>
      <Text category="t1" status="body" marginTop={24} marginLeft={32}>
        Tags
      </Text>
      <View style={styles.tagView}>
        {tags_data.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                const tagExists = tagsFilter.find((i) => i === item);
                if (tagExists) {
                  const newList = tagsFilter.filter((i) => i !== item);
                  dispatch(setTagsFilter(newList));
                } else {
                  let _tags = [...tagsFilter, item];
                  dispatch(setTagsFilter(_tags));
                }
              }}
              activeOpacity={0.7}
              key={index}
              style={[styles.tag, { backgroundColor: theme['background-basic-color-10'] }]}>
              <Text category="b4" status="placeholder">
                {item}
              </Text>
            </TouchableOpacity>
          );
        }, [])}
      </View> */}
      <Button children={t('apply_filter')} style={styles.button} />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  iconView: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginTop: 2,
    width: 21,
    height: 21,
    borderRadius: 21,
    borderWidth: 4,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  rate: {
    borderWidth: 1,
    marginRight: 12,
    borderRadius: 30,
    width: 40,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rateView: {
    marginTop: 12,
    marginHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginBottom: 2,
    width: 16,
    height: 16,
  },
  viewColor: {
    width: 48,
    height: 48,
    borderRadius: 48,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    width: 42,
    height: 42,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingLeft: 32,
    paddingRight: 24,
  },
  tag: {
    paddingHorizontal: 8,
    height: 24,
    justifyContent: 'center',
    borderRadius: 48,
    marginRight: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  tagView: {
    marginTop: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    marginHorizontal: 32,
  },
  button: {
    marginTop: 46,
    marginHorizontal: 32,
  },
  colorItem: {
    marginRight: 8,
  },
});
