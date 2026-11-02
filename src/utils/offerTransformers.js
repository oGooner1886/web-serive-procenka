export function flattenGoodsToOffers(rawGoods) {
  if (!Array.isArray(rawGoods) || rawGoods.length === 0) {
    return [];
  }

  const result = [];

  const extractRows = (item, isAnalogue = false) => {
    if (!item || (!item.brand && !item.name && !item.warehouses)) {
      return;
    }

    const {
      brand = '—',
      number = '—',
      name = '',
      warehouses,
      analogues,
    } = item;

    const warehousesList = Array.isArray(warehouses) ? warehouses : [];

    if (warehousesList.length > 0) {
      warehousesList.forEach((wh, index) => {
        const price = wh.price != null ? Number(wh.price) : null;
        const stock = wh.stock != null ? Number(wh.stock) : 0;
        const warehouseName = wh.name || wh.warehouse || `Warehouse #${index + 1}`;

        result.push({
          id: `${isAnalogue ? 'an' : 'orig'}-${brand}-${number}-${warehouseName}-${index}`,
          isAnalogue,
          brand,
          number,
          name,
          warehouseName,
          price,
          stock,
        });
      });
    } else {
      result.push({
        id: `${isAnalogue ? 'an' : 'orig'}-${brand}-${number}-nowh`,
        isAnalogue,
        brand,
        number,
        name,
        warehouseName: '—',
        price: null,
        stock: 0,
      });
    }

    if (Array.isArray(analogues)) {
      analogues.forEach((analogueItem) => extractRows(analogueItem, true));
    }
  };

  rawGoods.forEach((good) => extractRows(good, false));

  return result.sort((a, b) => {
    if (a.isAnalogue !== b.isAnalogue) {
      return a.isAnalogue ? 1 : -1;
    }
    return (a.price || Infinity) - (b.price || Infinity);
  });
}
