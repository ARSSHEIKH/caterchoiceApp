import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme, Layout, Icon } from '@ui-kitten/components';
import { useLayout } from 'hooks';

import HomeMainNavigator from './HomeMainNavigator';
import CategoriesMainNavigator from './CategoriesMainNavigator';
import CollectionMainNavigator from './CollectionMainNavigator';
import ProfileMainNavigator from './ProfileMainNavigator';
import CartNavigator from './CartNavigator';
import { orderSelector } from "../store/slices/orderSlice";

import { useAppSelector } from 'store/store';
import { MainStackParamList } from './types';
import { IconName } from 'assets/icons';

const BottomTab = createBottomTabNavigator<MainStackParamList>();

const MainBottomTab = memo(() => {
  const theme = useTheme();
  const { bottom } = useLayout();
  const { cart } = useAppSelector(orderSelector);

  const total = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const HEIGHT_BOTTOM_TAB = bottom + 49;

  const MyTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
      <Layout style={[styles.container, { height: HEIGHT_BOTTOM_TAB }]}>
        <View
          style={[
            styles.viewButtonTab,
            {
              height: HEIGHT_BOTTOM_TAB,
              paddingBottom: bottom + 8,
            },
          ]}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            const fill = isFocused ? theme['text-basic-color'] : theme['text-placeholder-color'];

            const getIcon = React.useCallback(() => {
              let icon: keyof IconName = 'home';
              if (index === 0) {
                isFocused ? (icon = 'home-fill') : (icon = 'home');
              } else if (index === 1) {
                isFocused ? (icon = 'collection-fill') : (icon = 'collection');
              } else if (index === 2) {

                isFocused ? (icon = 'cart') : (icon = 'cart');
              } else if (index === 3) {
                isFocused ? (icon = 'user-fill') : (icon = 'user');
              }
              return icon;
            }, [index, isFocused]);

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  styles.buttonTab,

                  // {
                  //   marginRight: index === 1 ? 24 : undefined,
                  //   marginLeft: index === 2 ? 24 : undefined,
                  // },
                ]}>
                <Icon pack="assets" name={getIcon()} style={[styles.icon, { tintColor: fill }]} />
                {index == 2 && total > 0 &&
                  <View style={styles.badge} ><Text style={styles.badgeText}>{total}</Text></View>
                }

              </TouchableOpacity>
            );
          })}
        </View>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('MyCart')}
          activeOpacity={0.7}
          style={[
            styles.cart,
            {
              bottom: bottom + 4,
              backgroundColor: theme['background-basic-color-1'],
            },
          ]}>
          <Layout level="6" style={styles.content}>
            <Icon pack="assets" name="cart" style={{ tintColor: theme['cart-tint-color'] }} />
          </Layout>
        </TouchableOpacity> */}
      </Layout>
    );
  };

  return (
    <BottomTab.Navigator
      initialRouteName="HomeMain"
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard:true }}
      tabBar={(props) => <MyTabBar {...props} />}>
      <BottomTab.Screen name="HomeMain" component={HomeMainNavigator} />
      <BottomTab.Screen name="CollectionMain" component={CollectionMainNavigator} />
      <BottomTab.Screen name="Cart" component={CartNavigator} />
      <BottomTab.Screen name="ProfileMain" component={ProfileMainNavigator} />
    </BottomTab.Navigator>
  );
});

export default MainBottomTab;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  viewButtonTab: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  },
  buttonTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cart: {
    width: 58,
    height: 58,
    borderRadius: 58,
    padding: 4,
    alignSelf: 'center',
    position: 'absolute',
  },
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 58,
  },
  badge: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 6,
    right: 30,
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 10
  },
  badgeText: {
    color: "#fff",
    fontSize: 12
  }
});
