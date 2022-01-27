import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'

export const initI18n = (
  resources: Resource,
  language?: string,
  debug?: boolean,
) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'us',
    debug,
  })

  return i18n
}

export { I18nextProvider, useTranslation, withTranslation } from 'react-i18next'

export type { WithT } from 'i18next'
export type {
  Namespace,
  UseTranslationOptions,
  UseTranslationResponse,
} from 'react-i18next'