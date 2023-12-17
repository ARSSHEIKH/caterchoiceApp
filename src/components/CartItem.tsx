import React from 'react';
import { View, Image, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme, Icon, Layout } from '@ui-kitten/components';
import { useAnimationState, MotiView } from 'moti';
import { useBoolean } from 'hooks';

import Text from './Text';
import ColorItem from './ColorItem';
import SizeItem from './SizeItem';
import FastImage from 'react-native-fast-image';

import { CartFragment } from 'constants/types';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import {cdn, currency} from "constants/common";


interface CartItemProps {
  style?: ViewStyle;
  enabled?: boolean;
  item: CartFragment;
  selectedItem: boolean;
  onPress?(): void;
  onDelete?(item:any): void;
  addToCart?(item:any): void;
  decrementCart?(item:any): void;
}

const CartItem: React.FC<CartItemProps> = ({
  style,
  selectedItem,
  item,
  onPress,
  onDelete,
  addToCart,
  decrementCart,
  enabled = false,
}) => {
  const theme = useTheme();
  const refSwipeable = React.useRef<Swipeable>(null);
  const [expand, { toggle }] = useBoolean(false);
  const [number, setNumber] = React.useState<number>(0);
  const [colorSelected, setColorSelected] = React.useState<string>('');
  const [sizeSelected, setSizeSelected] = React.useState<string>('');
  

  const { image, name, price, quantity, colors, color, sizes, size } = item;

  const images = image?.split(',');

  const borderColor = theme['background-basic-color-3'];

  React.useEffect(() => {
    setNumber(quantity);
    setColorSelected(color);
    setSizeSelected(size);
  }, [quantity]);

  const handleIncrement = React.useCallback(() => {
    addToCart(item)
  }, [item]);

  const handleDecrement = React.useCallback(() => {
    decrementCart(item)
  }, [item]);

  const animationState = useAnimationState({
    from: {
      height: 0,
      opacity: 0,
    },
    to: {
      height: 174,
      opacity: 1,
    },
  });

  const animationArrowState = useAnimationState({
    from: {
      transform: [{ rotate: '0deg' }],
    },
    to: {
      transform: [{ rotate: '180deg' }],
    },
  });

  React.useEffect(() => {
    if (!expand) {
      animationState.transitionTo('from');
      animationArrowState.transitionTo('from');
    } else {
      animationState.transitionTo('to');
      animationArrowState.transitionTo('to');
    }
  }, [expand]);

  const renderRightActions = React.useCallback(() => {
    return (
      <View>
        <RectButton
          style={[styles.button, { backgroundColor: theme['color-secondary-07'] }]}
          onPress={() => {
            refSwipeable.current?.close();
            onDelete && onDelete(item);
          }}>
          <View style={[styles.trash, { backgroundColor: theme['color-basic-100'] }]}>
            <Icon pack="assets" name="trash" style={styles.icon} />
          </View>
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
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.item, { backgroundColor: theme['background-basic-color-1'] }, style]}
        onPress={onPress}>
        <View
          style={[
            styles.select,
            {
              borderWidth: selectedItem ? 4 : 2,
              borderColor: selectedItem ? '#743C2D' : theme['background-basic-color-5'],
              backgroundColor: selectedItem ? 'transparent' : theme['background-basic-color-10'],
            },
          ]}
        />
        <View style={[styles.contentContainer, { borderColor }]}>
          <View style={styles.top}>
            <Layout style={styles.imageView}>
              <FastImage source={{ uri: cdn+images?.[0] }} style={styles.image} />
            </Layout>
            <View style={styles.flexOne}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={styles.flexOne}>
                  <Text category="c2">{name}</Text>
                </View>
                {/* <TouchableOpacity activeOpacity={0.7} onPress={toggle}>
                  <MotiView
                    state={animationArrowState}
                    style={styles.arrow}
                    transition={{ type: 'timing' }}>
                    <Icon pack="assets" name="down" />
                  </MotiView>
                </TouchableOpacity> */}
              </View>
              <View style={styles.bottom}>
                <View style={styles.count}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleIncrement}
                    style={styles.button2}>
                    <Layout level="6" style={styles.button1}>
                      <Icon
                        pack="assets"
                        name="plus"
                        style={[styles.icon12, { tintColor: theme['color-basic-100'] }]}
                      />
                    </Layout>
                  </TouchableOpacity>
                  <View style={styles.number}>
                    <Text>{number}</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleDecrement}
                    style={styles.button3}>
                    <View style={styles.button1}>
                      <Icon pack="assets" name="minus" style={styles.icon12} />
                    </View>
                  </TouchableOpacity>
                </View>
                <Text category="t1">{currency}{price}</Text>
              </View>
            </View>
          </View>
          <MotiView state={animationState} transition={{ type: 'timing' }}>
            <View style={[styles.content, { borderColor }]}>
              <Text category="c3" status="body" marginTop={12} marginBottom={8}>
                Select color
              </Text>
              <View style={styles.row}>
                {(colors|| []).map((i, idx) => {
                  return (
                    <ColorItem
                      color={i}
                      size="32"
                      colorSelected={colorSelected}
                      key={idx}
                      onPress={() => setColorSelected(i)}
                      style={styles.item1}
                    />
                  );
                })}
              </View>
              <Text category="c3" status="body" marginTop={12} marginBottom={8}>
                Select size
              </Text>
              <View style={styles.row}>
                {(sizes || []).map((i, idx) => {
                  return (
                    <SizeItem
                      size={i}
                      status="basic"
                      sizeSelected={sizeSelected}
                      key={idx}
                      onPress={() => setSizeSelected(i)}
                      style={styles.item1}
                    />
                  );
                })}
              </View>
            </View>
          </MotiView>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  item: {
    //flexDirection: 'row',
  },
  contentContainer: {
    marginLeft: 20,
    height: '100%',
    borderRadius: 8,
    padding: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  icon: {
    width: 16,
    height: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageView: {
    width: 64,
    aspectRatio: 1 / 1,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 12,
  },
  top: {
    flexDirection: 'row',
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  count: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button1: {
    borderRadius: 24,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  button3: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon12: {
    width: 12,
    height: 12,
  },
  number: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    alignSelf: 'flex-start',
    marginTop: -4,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item1: {
    marginRight: 8,
  },
  content: {
    marginTop: 12,
    borderTopWidth: 1,
  },
  trash: {
    width: 24,
    height: 24,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    width: 12,
    height: 12,
    borderRadius: 12,
    position: 'absolute',
    top: 38,
  },
});
