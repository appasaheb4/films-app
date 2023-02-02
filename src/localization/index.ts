import {
  initReactI18next,
  useTranslation as useTranslationi18next,
} from 'react-i18next';
import i18next, {LanguageDetectorModule, TFunction} from 'i18next';
import {arabicTranslations, englishTranslations} from './translations/index';
import {SecureStore} from '@/library/modules';

let appLanguage = 'en';

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => appLanguage,
  init: () => {},
  cacheUserLanguage: () => {},
};

const resources = {
  en: {
    ...englishTranslations,
  },
  ar: {
    ...arabicTranslations,
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: appLanguage,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export const setLanguage = async (): Promise<void> => {
  const currentLanguage = await SecureStore.getItemAsync('language');
  if (!currentLanguage) {
    SecureStore.setItemAsync('language', 'en');
  } else {
    appLanguage = currentLanguage;
  }
  i18next.changeLanguage(appLanguage);
};

export const useTranslation = (
  key: string,
  params?: Record<string, unknown>,
): string => {
  const {t} = useTranslationi18next();
  return t(key, params);
};

export const t = (key: string, params?: Record<string, unknown>): TFunction =>
  i18next.t(key, params);

export const changeLanguage = (): void => {
  const currentlanguage = i18next.language;
  if (currentlanguage === 'en') {
    i18next.changeLanguage('ar');
  } else {
    i18next.changeLanguage('en');
  }
};

export default i18next;
