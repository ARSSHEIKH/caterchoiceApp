import React from 'react';
import createStackNavigator from './createStackNavigator';

import OrderDetails from 'screens/order/OrderDetails';
import ProductSize from 'screens/product/ProductSize';
import OrderTracking from 'screens/order/OrderTracking';
import ProductDetails from 'screens/product/ProductDetails';
import ProductReviewNew from 'screens/product/ProductReviewNew';
import ProductInformation from 'screens/product/ProductInformation';
import ProductReview from 'screens/product/ProductReview/ProductReview';
import ProductGridScreen from 'screens/product/ProductGrid/ProductGridScreen';
import CheckOut from 'screens/product/CheckOut';

import { ProductStackParamList } from './types';
import MyAddress from 'screens/address/MyAddress';
import AddressDetails from 'screens/address/AddressDetails';
import AddAddress from 'screens/address/AddAddress';
import MyCard from 'screens/card/MyCard';
import MyCart from 'screens/order/MyCart';
import AddCard from 'screens/card/AddCard';
import OrderCompleted from 'screens/order/OrderCompleted';

const Stack = createStackNavigator<ProductStackParamList>();

const ProductNavigator = React.memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProductGrid">
      <Stack.Screen name="ProductGrid" component={ProductGridScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ProductSize" component={ProductSize} />
      <Stack.Screen name="ProductInformation" component={ProductInformation} />
      <Stack.Screen name="ProductReview" component={ProductReview} />
      <Stack.Screen name="ProductReviewNew" component={ProductReviewNew} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="OrderTracking" component={OrderTracking} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
      <Stack.Screen name="MyAddress" component={MyAddress} />
      <Stack.Screen name="AddressDetails" component={AddressDetails} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="MyCard" component={MyCard} />
      <Stack.Screen name="MyCart" component={MyCart} />
      <Stack.Screen name="AddCard" component={AddCard} />
    </Stack.Navigator>
  );
});

export default ProductNavigator;
