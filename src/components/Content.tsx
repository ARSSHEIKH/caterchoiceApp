import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useTheme } from '@ui-kitten/components';

interface ContentProps extends ScrollViewProps {
  isPadding?: boolean;
  level?: '1' | '2' | '3' | '4' | '5';
}

const Content: React.FC<ContentProps> = ({
  style,
  contentContainerStyle,
  children,
  isPadding,
  level = '1',
  ...props
}) => {
  const theme = useTheme();
  return (
    <ScrollView
      {...props}
      style={[{ backgroundColor: theme[`background-basic-color-${level}`] }, style]}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[contentContainerStyle, isPadding && { paddingHorizontal: 16 }]}>
      {children}
    </ScrollView>
  );
};

export default Content;
