import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BrandButton } from './BrandButton';

export const BrandList = memo(function BrandList({
  brands,
  selectedBrand,
  onSelectBrand,
  isLoading,
  error,
  searchQuery,
}) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="card shadow-sm border-0 mb-4 text-center py-4">
        <div className="spinner-border text-primary mx-auto mb-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="text-muted small">
          {t('brands.loading', { query: searchQuery })}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger shadow-sm mb-4" role="alert">
        <h6 className="alert-heading mb-1">{t('brands.errorTitle')}</h6>
        <p className="mb-0 small">{error}</p>
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    if (!searchQuery) return null;
    return (
      <div className="alert alert-warning shadow-sm mb-4" role="alert">
        {t('brands.notFound', { query: searchQuery })}
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title text-secondary mb-0 fs-6 fs-md-5">
            {t('brands.selectTitle', { count: brands.length })}
          </h5>
          <span className="badge bg-light text-dark border font-monospace">
            {searchQuery}
          </span>
        </div>

        <div className="d-flex flex-wrap gap-2 brand-list-container">
          {brands.map((item) => (
            <BrandButton
              key={item.brand}
              item={item}
              isSelected={selectedBrand === item.brand}
              onSelect={onSelectBrand}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
