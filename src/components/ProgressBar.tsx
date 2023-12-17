import React from 'react';
import { ColorValue, LayoutChangeEvent, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import { useTheme, Layout } from '@ui-kitten/components';

interface ProgressBarProps {
  style?: StyleProp<ViewStyle>;
  progress: number;
  styleBar?: StyleProp<ViewStyle>;
  progressColor?: string | ColorValue;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ style, progress, styleBar, progressColor }) => {
  const theme = useTheme();
  const [width, setWidth] = React.useState<number>(1);

  const progressValue = React.useMemo(() => {
    return progress * width;
  }, [width, progress]);

  const slider = useDerivedValue(() => {
    return progress * width;
  }, [progress, width]);

  const styleSlider = useAnimatedStyle(() => {
    return {
      width: withTiming(slider.value, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  }, [slider]);

  const onLayout = React.useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    setWidth((prev) => {
      if (prev !== nativeEvent.layout.width) {
        return nativeEvent.layout.width;
      }
      return prev;
    });
  }, []);

  const backgroundColor = progressColor ? progressColor : theme['color-yellow-500'];

  return (
    <Layout level="3" style={[styles.container, style]} onLayout={onLayout}>
      <Animated.View
        style={[
          styles.slide,
          {
            backgroundColor,
            width: progressValue,
          },
          styleBar,
          styleSlider,
        ]}
      />
    </Layout>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 8,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  slide: {
    height: 8,
    borderRadius: 4,
  },
});
