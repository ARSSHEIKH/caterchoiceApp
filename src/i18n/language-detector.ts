import { LanguageDetectorAsyncModule } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async () => {
    return undefined;
  },
  cacheUserLanguage: async (lng) => {
    try {
      await AsyncStorage.setItem('lng', lng);
    } catch (error) {
    }
  },
};

export default languageDetector;
