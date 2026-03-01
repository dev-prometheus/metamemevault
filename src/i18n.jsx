import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
    .use(HttpBackend)
    .use(LanguageDetector)

    .use(initReactI18next)

    // Initialize with options
    .init({
        fallbackLng: 'en',
        debug: false,
        supportedLngs: ['en', 'es', 'fr', 'de', 'zh', 'jp', 'kr', 'ru', 'vi', 'tr', 'pt'],

        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },

        // Language detection settings
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },
    });

export default i18n;