// @desc    Converts Number to Price with two decimals and currency symbol
const toPrice = (value, currency) => {
  if(value) {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency
    });

    return formatter.format(value)
  }

  return null;
};

export default toPrice;