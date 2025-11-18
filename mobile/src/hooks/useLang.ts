import { useCallback } from 'react';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'fr';

export function useLanguage() {
  const currentLanguage = i18n.language as Language;
  const {t} = useTranslation();

  const changeLanguage = useCallback((lng: Language) => {
    i18n.changeLanguage(lng);
  }, []);

  return {
  currentLanguage,
    changeLanguage,
    t,
  };
}