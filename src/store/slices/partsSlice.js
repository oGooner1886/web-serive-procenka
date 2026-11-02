import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { favoritApi } from '../../api/favoritApi';
import { sanitizeInput } from '../../utils/sanitize';
import { apiCache } from '../../utils/cache';

export const fetchBrands = createAsyncThunk(
  'parts/fetchBrands',
  async (number, { signal, rejectWithValue }) => {
    try {
      const sanitizedNumber = sanitizeInput(number);
      if (!sanitizedNumber) {
        return [];
      }

      const cached = apiCache.getBrands(sanitizedNumber);
      if (cached) {
        return cached;
      }

      const response = await favoritApi.get('', {
        params: { number: sanitizedNumber },
        signal,
      });

      const goods = response.data?.goods;

      if (!goods || !goods.length || (goods.length === 1 && !goods[0].brand)) {
        apiCache.setBrands(sanitizedNumber, []);
        return [];
      }

      const uniqueBrands = [];
      const seenBrands = new Set();

      goods.forEach((item) => {
        if (item.brand && typeof item.brand === 'string') {
          const brandName = item.brand.trim();
          const key = brandName.toUpperCase();
          if (!seenBrands.has(key)) {
            seenBrands.add(key);
            uniqueBrands.push({
              brand: brandName,
              number: item.number ? String(item.number).trim() : sanitizedNumber,
              name: item.name ? String(item.name).trim() : '',
            });
          }
        }
      });

      apiCache.setBrands(sanitizedNumber, uniqueBrands);
      return uniqueBrands;
    } catch (error) {
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        return rejectWithValue('__ABORTED__');
      }
      return rejectWithValue(error.message || 'Error fetching brands');
    }
  }
);

export const fetchOffers = createAsyncThunk(
  'parts/fetchOffers',
  async ({ number, brand }, { signal, rejectWithValue }) => {
    try {
      const sanitizedNumber = sanitizeInput(number);
      const sanitizedBrand = sanitizeInput(brand);

      if (!sanitizedNumber || !sanitizedBrand) {
        return [];
      }

      const cached = apiCache.getOffers(sanitizedNumber, sanitizedBrand);
      if (cached) {
        return cached;
      }

      const response = await favoritApi.get('', {
        params: {
          number: sanitizedNumber,
          brand: sanitizedBrand,
          analogues: 'on',
        },
        signal,
      });

      const goods = response.data?.goods;

      if (!goods || !goods.length || (goods.length === 1 && !goods[0].brand && !goods[0].warehouses)) {
        apiCache.setOffers(sanitizedNumber, sanitizedBrand, []);
        return [];
      }

      apiCache.setOffers(sanitizedNumber, sanitizedBrand, goods);
      return goods;
    } catch (error) {
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        return rejectWithValue('__ABORTED__');
      }
      return rejectWithValue(error.message || 'Error fetching offers');
    }
  }
);

const initialState = {
  searchQuery: '',
  brands: [],
  selectedBrand: null,
  rawGoods: [],
  brandsLoading: false,
  brandsError: null,
  offersLoading: false,
  offersError: null,
};

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = sanitizeInput(action.payload);
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload ? sanitizeInput(action.payload) : null;
    },
    clearAll: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.brandsLoading = true;
        state.brandsError = null;
        state.brands = [];
        state.selectedBrand = null;
        state.rawGoods = [];
        state.offersError = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.brandsLoading = false;
        if (action.payload !== '__ABORTED__') {
          state.brandsError = action.payload;
        }
      })
      .addCase(fetchOffers.pending, (state) => {
        state.offersLoading = true;
        state.offersError = null;
        state.rawGoods = [];
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offersLoading = false;
        state.rawGoods = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.offersLoading = false;
        if (action.payload !== '__ABORTED__') {
          state.offersError = action.payload;
        }
      });
  },
});

export const { setSearchQuery, setSelectedBrand, clearAll } = partsSlice.actions;
export default partsSlice.reducer;
