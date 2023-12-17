import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps, Image } from 'react-native';
import { useTheme, Icon } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import Text from './Text';

import {category_uri} from "../constants/common";

import { CategoryFragment } from 'constants/types';

interface CategoryItemProps extends TouchableOpacityProps {
  item: CategoryFragment;
  onPress?(): void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, onPress, ...rest }) => {
  const theme = useTheme();
  const { name , icon, color , image} = item;

  return (
    <TouchableOpacity activeOpacity={0.7} {...rest} onPress={onPress}>
      {/* {icon &&
      <View style={[styles.iconView, { backgroundColor: color }]}>
        <Icon pack="assets" name={icon} style={{ tintColor: theme['color-basic-100'] }} />
      </View>
      } */}
      <View  style={[styles.iconView, { backgroundColor: color }]}>
      <FastImage style={{flex:1, width:120, height:120}} resizeMode="contain" source={{uri:category_uri+image}} />
      </View>
      
      <Text marginTop={8} center category="c1" status="content">
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  iconView: {
    //borderRadius: 58 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: 'white',
  },
});
