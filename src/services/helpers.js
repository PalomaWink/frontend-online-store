export const formatPrice = (price) => {
  const [reais, centavos] = price.toFixed(2).split('.');
  return { reais, centavos };
};

export const formatOriginalPrice = (price) => {
  if (price === null) {
    return { originalReais: '', originalCentavos: '' };
  }
  const [originalReais, originalCentavos] = price.toFixed(2).split('.');
  return { originalReais, originalCentavos };
};
