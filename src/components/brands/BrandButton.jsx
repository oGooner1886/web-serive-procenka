import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { translatePartName } from '../../utils/partTranslator';

export const BrandButton = memo(function BrandButton({ item, isSelected, onSelect }) {
  const { i18n } = useTranslation();
  const { brand, name } = item;

  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'ru';
  const displayName = translatePartName(name, currentLang);
  const tooltipTitle = currentLang === 'en' && displayName !== name
    ? `${displayName} (RU: ${name})`
    : name;

  return (
    <button
      type="button"
      className={`btn btn-outline-primary text-start p-2 p-md-3 brand-btn ${
        isSelected ? 'active text-white' : ''
      }`}
      onClick={() => onSelect(brand)}
    >
      <div className="fw-bold fs-6">{brand}</div>
      {name && (
        <div
          className="small opacity-75 text-truncate brand-btn-subtitle"
          title={tooltipTitle}
        >
          {displayName}
        </div>
      )}
    </button>
  );
});
