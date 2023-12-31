import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import Text from './Text';
import ProductHorizontal from './ProductHorizontal';
import { OrderFragment } from 'constants/types';
import { openLink } from 'utils/openLink';
import { paymentUrl } from 'constants/common';
import { useNavigation } from '@react-navigation/native';
import { IProductItemState } from 'store/slices/productSlice';

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
  const { reference_no, payment_status, items, id } = item;
  const { navigate } = useNavigation()

  return (
    <View
      style={[styles.container, { borderBottomColor: theme['background-basic-color-4'] }, style]}>
     
        <Text category="t2" status="content" maxWidth={"95%"}>
          {t('order')} #{reference_no}
        </Text>
        <View style={{flexDirection:"row", alignItems:"center"}}>
        <Text category="c2">{payment_status}</Text>
        {
          payment_status && payment_status?.toLowerCase().includes("pending") &&
          <Text category="b4" underline style={{ padding: 10 }}
            onPress={() => navigate('OrderCompleted', { orderId: id })}
          >
            Pay Now
          </Text>
        }
      </View>
      {(items || []).map((i:IProductItemState, idx:number) => {
        return <ProductHorizontal key={idx} item={(i?.product || {})} type={i?.type} />
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
