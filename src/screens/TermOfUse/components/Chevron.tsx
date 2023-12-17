import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { useTheme } from '@ui-kitten/components';

interface ChevronProps {
  progress: Animated.SharedValue<number>;
}

const size = 30;

const Chevron = ({ progress }: ChevronProps) => {
  const theme = useTheme();
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);

  const style = useAnimatedStyle(() => ({
    backgroundColor: progress.value === 0 ? 'transparent' : theme['color-primary-500'],
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }));

  const style1 = useAnimatedStyle(() => ({
    color:
      progress.value === 0 ? theme['text-placeholder-color'] : theme['background-basic-color-1'],
  }));

  const style2 = useAnimatedStyle(() => ({
    color:
      progress.value === 0 ? theme['text-placeholder-color'] : theme['background-basic-color-6'],
  }));

  return (
    <Animated.View style={[styles.container, style]}>
      <Svg width={24} height={24} fill="transparent">
        <AnimatedSvg
          //@ts-ignore
          style={style1}>
          <AnimatedPath
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.195 9.695c.26-.26.683-.26.943 0L12 13.557l3.862-3.862a.667.667 0 1 1 .943.943L12.943 14.5c-.52.52-1.365.52-1.886 0l-3.862-3.862a.667.667 0 0 1 0-.943Z"
            fill="currentColor"
          />
        </AnimatedSvg>
        <AnimatedSvg
          //@ts-ignore
          style={style2}>
          <Rect x={0.5} y={0.5} width={23} height={23} rx={11.5} stroke="currentColor" />
        </AnimatedSvg>
      </Svg>
    </Animated.View>
  );
};

export default Chevron;

const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#525251',
  },
});
