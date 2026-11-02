import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from '../../hooks/useDebounce';
import { sanitizeInput } from '../../utils/sanitize';

export const SearchForm = memo(function SearchForm({ onSearch, onClear, isLoading }) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [isCooldown, setIsCooldown] = useState(false);

  const debouncedSearch = useDebouncedCallback(
    (query) => {
      onSearch(query);
    },
    500,
    { leading: false, trailing: true }
  );

  const submitWithCooldown = useDebouncedCallback(
    (query) => {
      debouncedSearch.cancel();
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 1000);
      onSearch(query);
    },
    1000,
    { leading: true, trailing: false }
  );

  const handleChange = (e) => {
    const sanitized = sanitizeInput(e.target.value, 50);
    setInputValue(sanitized);

    if (sanitized.length > 0) {
      debouncedSearch(sanitized);
    } else {
      debouncedSearch.cancel();
      submitWithCooldown.cancel();
      if (onClear) onClear();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitized = sanitizeInput(inputValue, 50);
    if (sanitized.length > 0 && !isLoading && !isCooldown) {
      submitWithCooldown(sanitized);
    }
  };

  const handleClear = () => {
    debouncedSearch.cancel();
    submitWithCooldown.cancel();
    setInputValue('');
    if (onClear) onClear();
  };

  const isButtonDisabled = isLoading || isCooldown || !inputValue.trim();

  return (
    <div className="card shadow-sm border-0 mb-3 mb-md-4">
      <div className="card-body p-3 p-md-4">
        <h5 className="card-title text-secondary mb-2 mb-md-3 fs-6 fs-md-5">
          <i className="bi bi-search me-2"></i>{t('search.stage')}
        </h5>

        <form onSubmit={handleSubmit} className="row g-2 align-items-center">
          <div className="col-12 col-md-8 col-lg-9 position-relative">
            <input
              type="text"
              className="form-control form-control-lg font-monospace"
              placeholder={t('search.placeholder')}
              value={inputValue}
              onChange={handleChange}
              maxLength={50}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="characters"
              spellCheck="false"
              autoFocus
            />
            {inputValue && (
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none me-2 p-1"
                onClick={handleClear}
                title={t('search.clear')}
              >
                ✕
              </button>
            )}
          </div>
          <div className="col-12 col-md-4 col-lg-3 d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isButtonDisabled}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {t('search.searching')}
                </>
              ) : isCooldown ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2 opacity-50"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {t('search.requestSent')}
                </>
              ) : (
                t('search.submit')
              )}
            </button>
          </div>
        </form>

        <div className="d-flex flex-wrap justify-content-between align-items-center mt-2 small text-muted">
          <span>
            {t('search.hintAuto')}
          </span>
          <span className="d-none d-sm-inline text-secondary fst-italic">
            {t('search.hintExact')}
          </span>
        </div>
      </div>
    </div>
  );
});
