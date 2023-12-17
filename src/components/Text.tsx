import React from 'react';
import { TextStyle } from 'react-native';
import { Text, TextProps } from '@ui-kitten/components';

export interface MyTextProps extends TextProps {
  style?: TextStyle;
  category?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 't1'
    | 't2'
    | 'b1'
    | 'b2'
    | 'b3'
    | 'b4'
    | 'b5'
    | 'c1'
    | 'c2'
    | 'c3'
    | 'c4'
    | 'c5';
  status?:
    | 'basic'
    | 'primary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'control'
    | 'description' // Neutral/08
    | 'white' // Neutral/01
    | 'sub' // Neutral/05
    | 'body' // Neutral/07
    | 'title' // Primary
    | 'placeholder' // Neutral/06
    | 'content'; // Neutral/09
  children?: any;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  opacity?: number;
  maxWidth?: number;
  fontSize?: number;
  lineHeight?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  none?: boolean;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  underline?: boolean;
  line_through?: boolean;
}
const getLineHeight = (
  category:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 't1'
    | 't2'
    | 'b1'
    | 'b2'
    | 'b3'
    | 'b4'
    | 'b5'
    | 'c1'
    | 'c2'
    | 'c3'
    | 'c4'
    | 'c5'
): number => {
  switch (category) {
    case 'h1':
    case 'h2':
      return 48;
    case 'h3':
    case 'h4':
      return 40;
    case 'h5':
      return 32;
    case 'h6':
    case 't1':
      return 28;
    case 't2':
    case 'b1':
    case 'b2':
    case 'b4':
      return 24;
    case 'b3':
    case 'b5':
      return 20;
    case 'c1':
    case 'c2':
      return 16;
    case 'c3':
    case 'c4':
    case 'c5':
      return 12;
    default:
      return 24;
  }
};
export default React.forwardRef(
  (
    {
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      marginVertical,
      marginHorizontal,
      opacity,
      uppercase,
      lowercase,
      capitalize,
      none,
      left,
      right,
      center,
      underline,
      line_through,
      category = 'b1',
      status,
      children,
      maxWidth,
      style,
      ...rest
    }: MyTextProps,
    ref
  ) => {
    let textAlign: 'left' | 'center' | 'right' | 'auto' | 'justify' | 'left';

    left
      ? (textAlign = 'left')
      : right
      ? (textAlign = 'right')
      : center
      ? (textAlign = 'center')
      : (textAlign = 'left');

    let textTransform: 'uppercase' | 'lowercase' | 'capitalize' | 'none';

    uppercase
      ? (textTransform = 'uppercase')
      : lowercase
      ? (textTransform = 'lowercase')
      : capitalize
      ? (textTransform = 'capitalize')
      : none
      ? (textTransform = 'none')
      : (textTransform = 'none');

    let textDecorationLine: 'none' | 'underline' | 'line-through' | 'underline line-through';
    underline
      ? (textDecorationLine = 'underline')
      : line_through
      ? (textDecorationLine = 'line-through')
      : (textDecorationLine = 'none');

    return (
      <Text
        category={category}
        status={status}
        style={[
          {
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginTop: marginTop,
            marginBottom: marginBottom,
            marginVertical: marginVertical,
            marginHorizontal: marginHorizontal,
            opacity: opacity,
            textAlign: textAlign,
            maxWidth: maxWidth,
            lineHeight: getLineHeight(category),
            textTransform: textTransform,
            textDecorationLine: textDecorationLine,
          },
          style,
        ]}
        {...rest}>
        {children}
      </Text>
    );
  }
);
