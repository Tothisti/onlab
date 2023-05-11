import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { en } from './lang/en'
import { de } from './lang/de'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
const i18n = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    fallbackNS: 'translation',
    resources: {
      en,
      de
    }
  })

export default i18n

export const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' }
}

const languageFormatObj = {
  en: 'en-US',
  de: 'de-DE'
}

type languageFormatType = 'en-US' | 'en-GB' | 'fi-FI' | 'es-ES' | 'de-DE' | undefined
export const GetCorrectLanguageFormat = (lng: string): languageFormatType => {
  return (languageFormatObj as any)[lng]
}
