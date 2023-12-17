import React, { memo } from 'react';
import createStackNavigator from './createStackNavigator';

import MyCart from 'screens/order/MyCart';
import ProductNavigator from './ProductNavigator';

import { CartMainParamList } from './types';

const Stack = createStackNavigator<CartMainParamList>();

const CartNavigator = memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MyCart">
      <Stack.Screen name="MyCart" component={MyCart} />
      <Stack.Screen name="Product" component={ProductNavigator} />
    </Stack.Navigator>
  );
});

export default CartNavigator;
