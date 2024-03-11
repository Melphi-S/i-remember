import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

export enum Language {
    ENGLISH = "en",
    RUSSIAN = "ru",
}

export const LOCAL_STORAGE_LANGUAGE_KEY = "language";
const fallbackLng = (localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) as Language) ??
Language.ENGLISH

void i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng,
        debug: true,

        interpolation: {
            escapeValue: false
        },

        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
    })

export default i18n
