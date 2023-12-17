import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { useElementSize, useLayout } from 'hooks';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

interface DotsProps<T> {
  translationX: Animated.SharedValue<number>;
  data: Array<T>;
}

function Dots<T>({ data, translationX }: DotsProps<T>) {
  const theme = useTheme();
  const { width } = useLayout();
  const { size, onLayout } = useElementSize();

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        { left: width / 2, transform: [{ translateX: size.width ? -size.width / 2 : 0 }] },
      ]}>
      {data.map((_, i) => {
        const dotColor = useDerivedValue(() => {
          return interpolateColor(
            translationX.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [theme['dot-basic-color-2'], theme['dot-basic-color-1'], theme['dot-basic-color-2']]
          );
        });

        const dotWidth = useDerivedValue(() => {
          return interpolate(
            translationX.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [6, 28, 6],
            Extrapolate.CLAMP
          );
        });

        const dotStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: dotColor.value,
            width: dotWidth.value,
          };
        });

        return <Animated.View key={i.toString()} style={[styles.dot, dotStyle]} />;
      })}
    </View>
  );
}

export default Dots;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});
