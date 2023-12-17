import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

interface FocusAwareStatusBarProps extends StatusBarProps {
  props?: StatusBarProps;
}

const FocusAwareStatusBar: React.FC<FocusAwareStatusBarProps> = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
