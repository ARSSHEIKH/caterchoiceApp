import 'react-native-gesture-handler';
import React from 'react';
import './src/i18n/config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox, StatusBar, StyleSheet, Image, AppState } from 'react-native';
import { ApplicationProvider, IconRegistry, } from '@ui-kitten/components';
import { default as darkTheme } from './src/constants/theme/dark.json';
import { default as lightTheme } from './src/constants/theme/light.json';
import { default as customTheme } from './src/constants/theme/appTheme.json';
import { default as customMapping } from './src/constants/theme/mapping.json';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AssetIconsPack from './src/assets/AssetIconsPack';
import * as eva from '@eva-design/eva';
import ThemeContext from './ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContainer from './src/navigation/AppContainer';

import { Provider } from 'react-redux';
import store, { persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Images } from "assets/images";
import { uri } from "constants/common";

import Api from "services/api";
import SplashScreen from 'screens/SplashScreen';

LogBox.ignoreLogs(['Constants.installationId has been deprecated']);

Api.init({ url: uri });

export default function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [apppState, setApppState] = React.useState(AppState.currentState);
  const [loading, setLoading] = React.useState<false | true>(true);
  const [splashShow, setSplashShow] = React.useState<false | true>(true);


  React.useEffect(() => {
    AsyncStorage.getItem('theme').then((value) => {
      if (value === 'light' || value === 'dark') setTheme(value);
    });

    setTimeout(() => {
      setSplashShow(false)
    }, 500);
  }, []);


  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    AsyncStorage.setItem('theme', nextTheme).then(() => {
      setTheme(nextTheme);
    });
  };


  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        {
          splashShow ?
            <SplashScreen setSplashShow={setSplashShow} />
            :
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
              <Provider store={store}>
                <PersistGate loading={<Image
                  style={{ flex: 1, resizeMode: "contain", alignSelf: "center" }}
                  source={Images.logo}
                  resizeMode="contain"
                />} persistor={persistor}>

                  <IconRegistry defaultIcons="lock" icons={[EvaIconsPack, AssetIconsPack]} />
                  <ApplicationProvider
                    {...eva}
                    theme={
                      theme === 'light'
                        ? { ...eva.light, ...customTheme, ...lightTheme }
                        : { ...eva.dark, ...customTheme, ...darkTheme }
                    }
                    /* @ts-ignore */
                    customMapping={customMapping}>
                    <SafeAreaProvider>
                      <StatusBar
                        barStyle={theme === 'dark' ? 'dark-content' : 'dark-content'}
                        translucent={true}
                        backgroundColor={'#00000000'}
                      />
                      <BottomSheetModalProvider>
                        <AppContainer />
                      </BottomSheetModalProvider>
                    </SafeAreaProvider>
                  </ApplicationProvider>
                </PersistGate>
              </Provider>
            </ThemeContext.Provider>
        }
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
