import Button from '@material-ui/core/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { lngs } from '../../app/i18/i18n'

const LanguageSwitcherPanel: React.FC = () => {
  const { i18n } = useTranslation()

  const buttons =
        Object.keys(lngs)
          .map(
            (lng) => (
            <Button color='primary' key={lng}

                onClick={() => { i18n.changeLanguage(lng).catch(() => { console.log('now lan') }) }}
                disabled={i18n.resolvedLanguage === lng}
                >
            {lngs[lng as keyof typeof lngs].nativeName}
            </Button>
            ))

  return (
    <>
        {buttons}
    </>
  )
}

export default LanguageSwitcherPanel
