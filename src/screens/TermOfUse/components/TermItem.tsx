import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  measure,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  runOnUI,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Text } from 'components';
import { useTheme } from '@ui-kitten/components';
import { useElementSize } from 'hooks';

import Chevron from './Chevron';

import { TermSpec } from 'constants/types';

interface TermItemProps {
  item: TermSpec;
}

const ListCategory = ({ item }: TermItemProps) => {
  const { title, description } = item;
  const theme = useTheme();
  const aref = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const height = useSharedValue(0);
  const progress = useDerivedValue(() => (open.value ? withSpring(1) : withTiming(0)));

  const style = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP);

    return {
      height: height.value * progress.value + 1,
      opacity,
    };
  });

  const textAnim = useAnimatedStyle(() => ({
    color: progress.value === 0 ? theme['text-body-color'] : theme['text-basic-color'],
  }));

  const lineAnim = useAnimatedStyle(() => {
    const heightAnim = interpolate(progress.value, [0, 1], [0, 100], Extrapolation.CLAMP);

    return {
      width: 3,
      height: `${heightAnim}%`,
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme['text-basic-color'],
    };
  });

  const containerAnim = useAnimatedStyle(() => {
    const paddingBottom = interpolate(progress.value, [0, 1], [24, 8], Extrapolation.CLAMP);

    return {
      paddingBottom,
    };
  });

  const { size, onLayout } = useElementSize();

  const AnimatedText = Animated.createAnimatedComponent(Text);

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          if (height.value === 0) {
            runOnUI(() => {
              'worklet';
              const m = measure(aref);
              height.value = m.height;
            })();
          }
          open.value = !open.value;
        }}>
        <View style={{ borderTopWidth: 1, borderTopColor: theme['background-basic-color-4'] }}>
          <Animated.View style={lineAnim} />
          <Animated.View style={[styles.container, containerAnim]}>
            <AnimatedText category="t1" style={textAnim}>
              {title}
            </AnimatedText>
            <Chevron {...{ progress }} />
          </Animated.View>
          <Animated.View style={[styles.items, style]}>
            <View ref={aref}>
              <View style={{ height: size.height }}>
                <Text category="b1" status="content">
                  {description}
                </Text>
              </View>
              <View onLayout={onLayout} style={styles.description}>
                <Text category="b1" marginBottom={24}>
                  {description}
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ListCategory;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  items: {
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  description: {
    position: 'absolute',
    opacity: 0,
  },
});
