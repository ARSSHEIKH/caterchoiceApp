import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme, Icon, Layout } from '@ui-kitten/components';

import Text from './Text';

import { VoucherFragment } from 'constants/types';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

interface VoucherItemProps {
  style?: ViewStyle;
  enabled?: boolean;
  item: VoucherFragment;
  onPress?(): void;
  onDelete?(): void;
}

const VoucherItem: React.FC<VoucherItemProps> = React.memo(
  ({ style, item, onPress, onDelete, enabled = false }) => {
    const theme = useTheme();
    const refSwipeable = React.useRef<Swipeable>(null);

    const { is_free, name, discount, is_expired, time } = item;

    const getColor = React.useCallback(() => {
      if (is_expired) {
        return theme['color-basic-500'];
      }
      if (is_free) {
        return theme['color-secondary-03'];
      }
      switch (discount) {
        case 10:
          return theme['color-secondary-02'];
        case 15:
          return theme['color-secondary-01'];
        case 20:
          return theme['color-secondary-04'];
        case 30:
          return theme['color-secondary-05'];
        default:
          return theme['color-secondary-02'];
      }
    }, [is_expired, is_free, discount]);

    const renderRightActions = React.useCallback(() => {
      return (
        <View>
          <RectButton
            style={[styles.button, { backgroundColor: theme['background-basic-color-1'] }]}
            onPress={() => {
              refSwipeable.current?.close();
              onDelete && onDelete();
            }}>
            <Icon pack="assets" name="trash" style={styles.icon} />
          </RectButton>
        </View>
      );
    }, []);

    return (
      <Swipeable
        ref={refSwipeable}
        renderRightActions={renderRightActions}
        containerStyle={styles.container}
        overshootRight={false}
        enabled={enabled}>
        <TouchableOpacity activeOpacity={1} style={[styles.item, style]} onPress={onPress}>
          <View style={styles.shape}>
            {Array(7)
              .fill(7)
              .map((i, idx) => {
                return <Layout key={idx} level="2" style={styles.box3} />;
              })}
          </View>
          <View style={styles.shape1}>
            {Array(2)
              .fill(2)
              .map((i, idx) => {
                return <Layout key={idx} level="2" style={styles.box3} />;
              })}
          </View>
          <View style={[styles.box, { backgroundColor: getColor() }]}>
            <Text category="h3" status="white" style={{ transform: [{ rotate: '270deg' }] }}>
              {is_free ? 'Free' : `${discount}%`}
            </Text>
          </View>
          <Layout level={is_expired ? '3' : '1'} style={styles.box1}>
            <Text category="b2" status={is_expired ? 'sub' : 'basic'}>
              {name}
            </Text>
            <Text category="b2" status={is_expired ? 'sub' : 'basic'}>
              {is_free ? 'Free all items' : `Discount ${discount}% all items`}
            </Text>
            <View style={styles.row}>
              <Icon pack="assets" name="clock" style={styles.icon1} />
              <Text marginLeft={4} category="c2" status="placeholder">
                {is_expired ? 'Expired' : time}
              </Text>
            </View>
          </Layout>
        </TouchableOpacity>
      </Swipeable>
    );
  }
);

export default VoucherItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 124,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  box: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  box1: {
    flex: 1,
    borderRadius: 4,
    padding: 16,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  icon1: {
    width: 16,
    height: 16,
  },
  box3: {
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  shape: {
    paddingVertical: 8,
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'space-around',
    height: '100%',
    left: -6,
  },
  shape1: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'space-between',
    left: 94,
    top: -6,
    bottom: -6,
  },
});
