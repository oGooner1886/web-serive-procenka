import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../../utils/formatters';
import { translatePartName } from '../../utils/partTranslator';

export const OfferTableRow = memo(function OfferTableRow({ row }) {
  const { t, i18n } = useTranslation();
  const { isAnalogue, brand, number, name, warehouseName, stock, price } = row;

  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'ru';
  const displayName = translatePartName(name, currentLang);
  const tooltipTitle = currentLang === 'en' && displayName !== name 
    ? `${displayName} (RU: ${name})` 
    : name;

  return (
    <>
      <tr className="d-none d-md-table-row">
        <td className="text-center align-middle">
          {isAnalogue ? (
            <span className="badge bg-info text-dark px-2 py-1">
              {t('offers.badgeAnalogue')}
            </span>
          ) : (
            <span className="badge bg-success px-2 py-1">
              {t('offers.badgeDirect')}
            </span>
          )}
        </td>
        <td className="align-middle">
          <div className="fw-bold text-dark">{brand}</div>
          <div className="text-muted small font-monospace">{number}</div>
        </td>
        <td className="align-middle">
          <div
            className="text-truncate fw-medium"
            style={{ maxWidth: '380px' }}
            title={tooltipTitle}
          >
            {displayName}
          </div>
        </td>
        <td className="align-middle">
          <span className="text-muted small">{warehouseName}</span>
        </td>
        <td className="text-center align-middle">
          {stock > 0 ? (
            <span className="badge bg-light text-success border border-success px-2 py-1">
              {stock} {t('offers.pcs')}
            </span>
          ) : (
            <span className="badge bg-light text-muted border px-2 py-1">
              0 {t('offers.pcs')}
            </span>
          )}
        </td>
        <td className="text-end align-middle">
          <span className="fw-bold text-primary fs-6">
            {formatPrice(price)}
          </span>
        </td>
      </tr>

      <tr className="d-md-none border-bottom">
        <td colSpan="6" className="p-3">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <span className="fw-bold fs-6 text-dark me-2">{brand}</span>
              <span className="badge font-monospace bg-light text-secondary border px-2 py-1">
                {number}
              </span>
            </div>
            {isAnalogue ? (
              <span className="badge bg-info text-dark">
                {t('offers.badgeAnalogue')}
              </span>
            ) : (
              <span className="badge bg-success">
                {t('offers.badgeDirect')}
              </span>
            )}
          </div>

          <div className="text-secondary small fw-medium mb-2 text-break" title={tooltipTitle}>
            {displayName}
          </div>

          <div className="d-flex justify-content-between align-items-center pt-2 border-top border-light-subtle">
            <div className="text-muted small">
              <span className="d-block text-truncate" style={{ maxWidth: '160px' }}>
                📍 {warehouseName}
              </span>
              <span>
                {t('offers.thStock')}:{' '}
                <strong className={stock > 0 ? 'text-success' : 'text-muted'}>
                  {stock} {t('offers.pcs')}
                </strong>
              </span>
            </div>
            <div className="text-end">
              <span className="fw-bold text-primary fs-5 d-block">
                {formatPrice(price)}
              </span>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
});
