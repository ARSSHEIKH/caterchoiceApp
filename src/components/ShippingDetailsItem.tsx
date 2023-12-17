import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Icon } from '@ui-kitten/components';

import Text, { MyTextProps } from './Text';

import { IconName } from 'assets/icons';

interface ShippingDetailsItemProps {
  icon: keyof IconName;
  description: string;
  is_last?: boolean;
  status?: 'basic' | 'body';
}

const ShippingDetailsItem: React.FC<ShippingDetailsItemProps> = ({
  is_last,
  icon,
  description,
  status = 'basic',
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: !is_last ? theme['background-basic-color-3'] : 'transparent',
        },
      ]}>
      <Icon pack="assets" name={icon} />
      <View style={styles.flexOne}>
        <Text category="b1" status={status} marginLeft={8}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default ShippingDetailsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  flexOne: {
    flex: 1,
  },
});
