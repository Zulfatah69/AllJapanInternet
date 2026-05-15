import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/index.js';
import jp from './jp/index.js';
import id from './id/index.js';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    jp: { translation: jp },
    id: { translation: id },
  },
  lng: 'id',
  fallbackLng: 'id',
  interpolation: { escapeValue: false },
});

export default i18n;
