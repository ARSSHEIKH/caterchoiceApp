import React, { memo } from 'react';
import createStackNavigator from './createStackNavigator';
import { IntroStackParamList } from './types';

import OnboardingScreen from 'screens/intro/Onboarding/OnboardingScreen';
import Newsletter from 'screens/intro/Newsletter/Newsletter';

const Stack = createStackNavigator<IntroStackParamList>();

const IntroNavigator = memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Newsletter" component={Newsletter} />
    </Stack.Navigator>
  );
});

export default IntroNavigator;
