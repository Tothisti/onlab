import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
const i18n = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    fallbackNS: 'translation',
    resources: {
      en: {
        translation: {
          hello: 'hello'
        },
        validation: {
          username: 'username',
          password: 'password',
          login: 'login',
          logout: 'logout'
        }
      },
      de: {
        translation: {
          hello: 'hallo'
        },
        validation: {
          username: 'nutzername',
          password: 'passwort',
          login: 'anmeldung',
          logout: 'ausloggen'
        }
      }
    }
  })

export default i18n

export const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' }
}
