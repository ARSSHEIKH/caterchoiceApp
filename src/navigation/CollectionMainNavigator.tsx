import React, { memo } from 'react';
import createStackNavigator from './createStackNavigator';

import CollectionScreen from 'screens/collection/Collection/CollectionScreen';
import ProductNavigator from './ProductNavigator';

import { CollectionMainParamList } from './types';

const Stack = createStackNavigator<CollectionMainParamList>();

const CollectionMainNavigator = memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CollectionScreen">
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
      <Stack.Screen name="Product" component={ProductNavigator} />
    </Stack.Navigator>
  );
});

export default CollectionMainNavigator;
