import React from 'react';
import { Animated, ViewStyle } from 'react-native';
import { useTheme } from '@ui-kitten/components';

interface SkeletonProps {
  style?: ViewStyle;
  variant?: 'box' | 'circle';
  width: number | string;
  height: number | string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, variant = 'circle', style }) => {
  const theme = useTheme();
  const opacity = React.useRef(new Animated.Value(0.3));

  let borderRadius = 0;
  const backgroundColor = theme['background-basic-color-3'];

  if (variant === 'circle') {
    borderRadius = typeof height === 'string' ? parseInt(height, 10) / 2 : height / 2;
  }

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, { toValue: 1, useNativeDriver: true, duration: 500 }),
        Animated.timing(opacity.current, { toValue: 0.3, useNativeDriver: true, duration: 800 }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ opacity: opacity.current, width, height, borderRadius, backgroundColor }, style]}
    />
  );
};

export default Skeleton;
