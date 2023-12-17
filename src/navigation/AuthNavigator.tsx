import React, { memo } from 'react';
import { AuthStackParamList } from './types';
import createStackNavigator from './createStackNavigator';

import SignIn from 'screens/auth/SignIn';
import SignUp from 'screens/auth/SignUp';
import ForgotPassword from 'screens/auth/ForgotPassword';
import Verification from 'screens/auth/Verification';
import ChangePassword from 'screens/auth/ChangePassword';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
});

export default AuthNavigator;
