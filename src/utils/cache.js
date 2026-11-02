const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_ENTRIES = 100;

const brandsCache = new Map();
const offersCache = new Map();

function cleanOldest(map) {
  if (map.size >= MAX_ENTRIES) {
    const oldestKey = map.keys().next().value;
    map.delete(oldestKey);
  }
}

export const apiCache = {
  getBrands(number) {
    if (!number) return null;
    const key = String(number).trim().toUpperCase();
    const entry = brandsCache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      brandsCache.delete(key);
      return null;
    }
    return entry.data;
  },

  setBrands(number, data) {
    if (!number) return;
    const key = String(number).trim().toUpperCase();
    cleanOldest(brandsCache);
    brandsCache.set(key, { data, timestamp: Date.now() });
  },

  getOffers(number, brand) {
    if (!number || !brand) return null;
    const key = `${String(number).trim().toUpperCase()}__${String(brand).trim().toUpperCase()}`;
    const entry = offersCache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      offersCache.delete(key);
      return null;
    }
    return entry.data;
  },

  setOffers(number, brand, data) {
    if (!number || !brand) return;
    const key = `${String(number).trim().toUpperCase()}__${String(brand).trim().toUpperCase()}`;
    cleanOldest(offersCache);
    offersCache.set(key, { data, timestamp: Date.now() });
  },

  clear() {
    brandsCache.clear();
    offersCache.clear();
  },
};
