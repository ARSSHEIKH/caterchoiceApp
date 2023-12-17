import React, { memo } from 'react';
import createStackNavigator from './createStackNavigator';

import ProfileScreen from 'screens/profile/Profile/ProfileScreen';

import { ProfileMainParamList } from './types';

const Stack = createStackNavigator<ProfileMainParamList>();

const ProfileMainNavigator = memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
});

export default ProfileMainNavigator;
