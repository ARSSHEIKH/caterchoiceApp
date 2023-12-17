import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import Text from './Text';

interface TitleBarProps {
  style?: ViewStyle;
  textStyle?:TextStyle;
  paddingHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  title: string;
  accessoryRight: {
    title: string;
    onPress?(): void;
  };
}

const TitleBar: React.FC<TitleBarProps> = ({
  style,
  textStyle,
  title,
  accessoryRight,
  paddingHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal,
          marginVertical,
          marginTop,
          marginBottom,
        },
        style,
      ]}>
      <Text status="content" category="h6" style={textStyle}>
        {title}
      </Text>
      {accessoryRight &&
      <TouchableOpacity
        onPress={accessoryRight?.onPress}
        disabled={!!!accessoryRight?.onPress}
        activeOpacity={!!accessoryRight?.onPress ? 0.7 : 1}>
        <Text status="description" category="c2">
          {accessoryRight?.title}
        </Text>
      </TouchableOpacity>
      }
    </View>
  );
};

export default TitleBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
