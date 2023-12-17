import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme, Icon } from '@ui-kitten/components';

interface ColorItemProps {
  style?: ViewStyle;
  color: string;
  colorSelected: string;
  onPress?(): void;
  size?: '48' | '32';
}

const ColorItem: React.FC<ColorItemProps> = ({
  style,
  color,
  colorSelected,
  size = '48',
  onPress,
}) => {
  const theme = useTheme();
  const borderColor =
    color === colorSelected ? theme['background-basic-color-6'] : theme['background-basic-color-4'];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          borderColor,
          width: size === '32' ? 32 : 48,
          height: size === '32' ? 32 : 48,
        },
        style,
      ]}
      onPress={onPress}>
      <View
        style={[
          styles.color,
          { width: size === '32' ? 26 : 42, height: size === '32' ? 26 : 42 },
          { backgroundColor: color },
        ]}>
        {color === colorSelected && (
          <Icon
            pack="assets"
            name="check-color"
            style={{
              width: size === '32' ? 16 : 24,
              height: size === '32' ? 16 : 24,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ColorItem;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 48,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
