import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import favoritLogo from '../assets/favicon.svg';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = memo(function Header() {
  const { t } = useTranslation();

  return (
    <header className="navbar navbar-dark shadow-sm mb-3 mb-md-4 py-2 py-md-3 site-header" style={{ backgroundColor: '#0f172a' }}>
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2 gap-md-3">
          <div
            className="d-flex align-items-center justify-content-center p-1 rounded-3 bg-white header-logo-box"
            style={{
              boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            }}
          >
            <img
              src={favoritLogo}
              alt="Favorit Parts"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          <div className="border-start border-secondary border-opacity-50 ps-2 ps-md-3">
            <div className="header-title text-white fw-bold tracking-wide">
              {t('header.title')}
            </div>
            <div className="text-secondary d-none d-sm-block header-subtitle">
              {t('header.subtitle')}
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 gap-md-3">
          <LanguageSwitcher />

          <div className="text-end border-start border-secondary border-opacity-50 ps-2 ps-md-3">
            <a
              href="tel:88007778548"
              className="text-white text-decoration-none fw-semibold header-phone d-block"
            >
              {t('header.phone')}
            </a>
            <span className="text-secondary d-none d-sm-inline header-phone-sub">
              {t('header.phoneNote')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
});
