import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'ru';

  const toggleLanguage = (lang) => {
    if (lang !== currentLang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <div
      className="d-inline-flex align-items-center p-1 rounded-pill border border-secondary border-opacity-50"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
    >
      <button
        type="button"
        className={`btn btn-sm py-0 px-2 rounded-pill border-0 ${
          currentLang === 'ru'
            ? 'bg-primary text-white fw-bold shadow-sm'
            : 'text-white-50 bg-transparent'
        }`}
        style={{ fontSize: '0.75rem', lineHeight: '1.4' }}
        onClick={() => toggleLanguage('ru')}
      >
        RU
      </button>
      <button
        type="button"
        className={`btn btn-sm py-0 px-2 rounded-pill border-0 ${
          currentLang === 'en'
            ? 'bg-primary text-white fw-bold shadow-sm'
            : 'text-white-50 bg-transparent'
        }`}
        style={{ fontSize: '0.75rem', lineHeight: '1.4' }}
        onClick={() => toggleLanguage('en')}
      >
        EN
      </button>
    </div>
  );
});
