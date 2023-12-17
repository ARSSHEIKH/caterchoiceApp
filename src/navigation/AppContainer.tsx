import React from 'react';
import { Alert, LogBox, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@ui-kitten/components';
import { useAuth } from 'hooks';

import IntroNavigator from './IntroNavigator';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import ProductNavigator from './ProductNavigator';
import BlogDetails from 'screens/blog/BlogDetails';
import ProfileEdit from 'screens/profile/ProfileEdit';
import ImageDetail from 'screens/ImageDetail';

import ModalScreen from 'screens/ModalScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import Loading from './Loading';
//import LinkingConfiguration from './LinkingConfiguration';
import { RootStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RootNavigation';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import BottomSheetContext from '../../BottomSheetContext';
import { ProfileMore } from 'components';
import { useAppSelector } from 'store/store';
import { userSelector } from 'store/slices/userSlice';
import Api from "services/api";


enableScreens();

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer: React.FC = () => {
  const themes = useTheme();
  const {user} = useAppSelector(userSelector);
  //@ts-ignore
  const routeNameRef = React.useRef<string | undefined>(undefined);
  const { isInitialized, isIntro, isSignedIn } = useAuth();

  const bottomSheetPhotoRef = React.useRef<BottomSheet>(null);
  const initialSnapPoints = React.useMemo(() => ['1%', 'CONTENT_HEIGHT'], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const expand = () => {
    bottomSheetPhotoRef.current?.expand();
  };

  const close = () => {
    bottomSheetPhotoRef.current?.close();
  };

  const getInitialRouteName = React.useCallback(() => {
    console.log(user?.access_token)
    if(user?.access_token){
      Api.setClientToken(user?.access_token);
    }
    
    if (!isIntro) {
      //return 'Intro'; //Intro
    }
    if (user) {
      return 'Drawer';
    }
    return 'Auth'; //Sign In
  }, [isIntro, isSignedIn]);

  const hiddenLoading = !isInitialized;

  if (!hiddenLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      // linking={LinkingConfiguration}
      onReady={() => (routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name)}>
      <View style={{ backgroundColor: themes['background-basic-color-1'], flex: 1 }}>
        <BottomSheetContext.Provider value={{ close, expand }}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={getInitialRouteName()}>
            <Stack.Screen
              name="Intro"
              component={IntroNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Product" component={ProductNavigator} />
            <Stack.Screen name="BlogDetails" component={BlogDetails} />
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
            <Stack.Screen name="ImageDetail" component={ImageDetail} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} />
            <Stack.Screen name="ModalScreen" component={ModalScreen} />
          </Stack.Navigator>
          <BottomSheet
            ref={bottomSheetPhotoRef}
            snapPoints={animatedSnapPoints}
            index={-1}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            backdropComponent={BottomSheetBackdrop}>
            <BottomSheetView onLayout={handleContentLayout}>
              <ProfileMore />
            </BottomSheetView>
          </BottomSheet>
        </BottomSheetContext.Provider>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;
