import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Icon, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { IconName } from 'assets/icons';

interface NavigationActionProps {
  icon?: keyof IconName;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  onPress?: () => void;
  status?: 'basic' | 'white';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const NavigationAction = React.memo(
  ({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    onPress,
    icon,
    status = 'basic',
    disabled,
    style,
  }: NavigationActionProps) => {
    const theme = useTheme();
    const { goBack } = useNavigation();

    const _onPress = React.useCallback(() => {
      if (onPress) {
        onPress && onPress();
      } else {
        goBack();
      }
    }, [onPress, goBack]);

    const getIconColor = (status: 'basic' | 'white'): string => {
      switch (status) {
        case 'basic':
          return theme['icon-basic-color'];
        case 'white':
          return theme['color-basic-100'];

        default:
          return theme['color-primary-100'];
      }
    };

    return (
      <TopNavigationAction
        onPress={_onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.container,
          style,
          {
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            height: 24,
            width: 24,
          },
        ]}
        icon={(props) => (
          <Icon
            {...props}
            pack="assets"
            name={icon || 'back'}
            style={[styles.icon24, { tintColor: getIconColor(status) }]}
          />
        )}
      />
    );
  }
);

export default NavigationAction;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon24: {
    width: 24,
    height: 24,
  },
});
