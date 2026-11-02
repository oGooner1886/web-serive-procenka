import React, { useMemo, useState, useRef, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { OfferTableRow } from './OfferTableRow';
import { flattenGoodsToOffers } from '../../utils/offerTransformers';

export const OffersTable = memo(function OffersTable({
  rawGoods,
  selectedBrand,
  isLoading,
  error,
}) {
  const { t } = useTranslation();
  const [filterQuery, setFilterQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleStockToggle = (e) => {
    setOnlyInStock(e.target.checked);
    setIsDebouncing(true);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setIsDebouncing(false);
    }, 300);
  };

  const flattenedOffers = useMemo(() => {
    return flattenGoodsToOffers(rawGoods);
  }, [rawGoods]);

  const filteredOffers = useMemo(() => {
    let result = flattenedOffers;

    if (onlyInStock) {
      result = result.filter(({ stock }) => stock > 0);
    }

    const query = filterQuery.trim().toLowerCase();
    if (!query) {
      return result;
    }

    return result.filter(({ name, brand, number, warehouseName }) =>
      name.toLowerCase().includes(query) ||
      brand.toLowerCase().includes(query) ||
      number.toLowerCase().includes(query) ||
      warehouseName.toLowerCase().includes(query)
    );
  }, [flattenedOffers, filterQuery, onlyInStock]);

  if (!selectedBrand) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="card shadow-sm border-0 py-5 text-center mb-4">
        <div className="spinner-border text-primary mx-auto mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h6 className="text-secondary">{t('offers.loading', { brand: selectedBrand })}</h6>
        <div className="text-muted small">{t('offers.loadingSub')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger shadow-sm mb-4" role="alert">
        <h6 className="alert-heading mb-1">{t('offers.errorTitle')}</h6>
        <p className="mb-0">{error}</p>
      </div>
    );
  }

  if (flattenedOffers.length === 0) {
    return (
      <div className="alert alert-info shadow-sm mb-4" role="alert">
        {t('offers.notFound', { brand: selectedBrand })}
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 mb-4 overflow-hidden">
      <div className="card-header bg-white py-3 px-3 px-md-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h5 className="mb-0 text-dark fs-5 fs-md-4">
            {t('offers.title')} <span className="text-primary">{selectedBrand}</span>
          </h5>
          <span className="badge bg-secondary">
            {t('offers.shownCount', { filtered: filteredOffers.length, total: flattenedOffers.length })}
          </span>
        </div>

        <div className="row g-2 align-items-center bg-light p-2 rounded-3">
          <div className="col-12 col-md-7 position-relative">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder={t('offers.filterPlaceholder')}
              value={filterQuery}
              maxLength={100}
              autoComplete="off"
              spellCheck="false"
              onChange={(e) => setFilterQuery(e.target.value)}
            />
            {filterQuery && (
              <button
                type="button"
                className="btn btn-link btn-sm position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none me-2"
                onClick={() => setFilterQuery('')}
                title={t('search.clear')}
              >
                ✕
              </button>
            )}
          </div>
          <div className="col-12 col-md-5 d-flex align-items-center justify-content-between justify-content-md-end gap-2">
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                id="onlyInStockCheck"
                checked={onlyInStock}
                disabled={isDebouncing}
                onChange={handleStockToggle}
                style={{ cursor: isDebouncing ? 'not-allowed' : 'pointer' }}
              />
              <label
                className={`form-check-label small user-select-none ${isDebouncing ? 'text-muted' : ''}`}
                htmlFor="onlyInStockCheck"
                style={{ cursor: isDebouncing ? 'not-allowed' : 'pointer' }}
              >
                {t('offers.onlyInStock')}
              </label>
            </div>
            {filterQuery && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setFilterQuery('')}
              >
                {t('offers.resetFilter')}
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredOffers.length === 0 ? (
        <div className="p-4 text-center text-muted">
          <p className="mb-2">
            {t('offers.noFilteredMatches')}
          </p>
          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={() => {
              setFilterQuery('');
              setOnlyInStock(false);
            }}
          >
            {t('offers.showAll', { total: flattenedOffers.length })}
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary d-none d-md-table-header-group">
              <tr>
                <th scope="col" style={{ width: '12%' }} className="text-center">{t('offers.thType')}</th>
                <th scope="col" style={{ width: '18%' }}>{t('offers.thBrandNumber')}</th>
                <th scope="col" style={{ width: '32%' }}>{t('offers.thName')}</th>
                <th scope="col" style={{ width: '16%' }}>{t('offers.thWarehouse')}</th>
                <th scope="col" style={{ width: '10%' }} className="text-center">{t('offers.thStock')}</th>
                <th scope="col" style={{ width: '12%' }} className="text-end pe-3">{t('offers.thPrice')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((row) => (
                <OfferTableRow key={row.id} row={row} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});
