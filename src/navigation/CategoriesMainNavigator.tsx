import React, { memo } from 'react';
import createStackNavigator from './createStackNavigator';

import CategoriesScreen from 'screens/category/Categories/CategoriesScreen';

import { CategoriesMainParamList } from './types';

const Stack = createStackNavigator<CategoriesMainParamList>();

const CategoriesMainNavigator = memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CategoriesScreen">
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
    </Stack.Navigator>
  );
});

export default CategoriesMainNavigator;
