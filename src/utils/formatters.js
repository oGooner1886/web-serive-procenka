const rubleFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 2,
});

export const formatPrice = (price) => {
  if (price == null || isNaN(price)) return '—';
  return rubleFormatter.format(price);
};
