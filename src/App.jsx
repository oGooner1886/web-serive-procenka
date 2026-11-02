import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBrands,
  fetchOffers,
  setSearchQuery,
  setSelectedBrand,
  clearAll,
} from './store/slices/partsSlice';
import { Header, SearchForm, BrandList, OffersTable } from './components';

export function App() {
  const dispatch = useDispatch();

  const activeBrandsPromiseRef = useRef(null);
  const activeOffersPromiseRef = useRef(null);

  const {
    searchQuery,
    brands,
    selectedBrand,
    rawGoods,
    brandsLoading,
    brandsError,
    offersLoading,
    offersError,
  } = useSelector((state) => state.parts);

  const handleSearch = useCallback(
    (query) => {
      if (activeBrandsPromiseRef.current) {
        activeBrandsPromiseRef.current.abort();
      }
      dispatch(setSearchQuery(query));
      activeBrandsPromiseRef.current = dispatch(fetchBrands(query));
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    if (activeBrandsPromiseRef.current) {
      activeBrandsPromiseRef.current.abort();
    }
    if (activeOffersPromiseRef.current) {
      activeOffersPromiseRef.current.abort();
    }
    dispatch(clearAll());
  }, [dispatch]);

  const handleSelectBrand = useCallback(
    (brandName) => {
      if (activeOffersPromiseRef.current) {
        activeOffersPromiseRef.current.abort();
      }
      dispatch(setSelectedBrand(brandName));
      activeOffersPromiseRef.current = dispatch(
        fetchOffers({
          number: searchQuery,
          brand: brandName,
        })
      );
    },
    [dispatch, searchQuery]
  );

  return (
    <div className="min-vh-100 bg-light pb-5">
      <Header />

      <main className="container" style={{ maxWidth: '1160px' }}>
        <SearchForm
          onSearch={handleSearch}
          onClear={handleClear}
          isLoading={brandsLoading}
        />

        <BrandList
          brands={brands}
          selectedBrand={selectedBrand}
          onSelectBrand={handleSelectBrand}
          isLoading={brandsLoading}
          error={brandsError}
          searchQuery={searchQuery}
        />

        <OffersTable
          rawGoods={rawGoods}
          selectedBrand={selectedBrand}
          isLoading={offersLoading}
          error={offersError}
        />
      </main>
    </div>
  );
}

export default App;
