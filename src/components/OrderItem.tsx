import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import Text from './Text';
import ProductHorizontal from './ProductHorizontal';
import { OrderFragment } from 'constants/types';

interface OrderItemProps {
  style?: ViewStyle;
  item: OrderFragment;
  buttonLeft?: {
    title?: string;
    onPress?: () => void;
  };
  buttonRight?: {
    title?: string;
    onPress?: () => void;
  };
}

const OrderItem: React.FC<any> = ({ style, item, buttonLeft, buttonRight }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { reference_no, sale_status, items } = item;
  return (
    <View
      style={[styles.container, { borderBottomColor: theme['background-basic-color-4'] }, style]}>
      <View style={styles.row}>
        <Text category="t1" status="content">
          {t('order')} #{reference_no}
        </Text>
        <Text category="c2">{sale_status}</Text>
      </View>
      {(items || []).map((i, idx) => {
        return <ProductHorizontal key={idx} item={(i?.product || {})} type={i?.type} />;
      })}
      <View style={styles.row1}>
        {buttonLeft &&
        <Button
          children={buttonLeft?.title}
          onPress={buttonLeft?.onPress}
          status="basic"
          style={styles.buttonLeft}
          size="medium"
        />
        }
        {buttonRight &&
        <Button
          children={buttonRight?.title}
          onPress={buttonRight?.onPress}
          style={styles.buttonRight}
          size="medium"
        />
        }
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row1: {
    marginTop: 12,
    flexDirection: 'row',
  },
  buttonLeft: {
    flex: 1,
    marginRight: 16,
  },
  buttonRight: {
    flex: 1,
  },
});
