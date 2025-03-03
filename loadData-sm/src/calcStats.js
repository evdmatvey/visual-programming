const calcStats = (products) => {
  const stats = {};

  products.forEach((product) => {
    if (stats[product.category]) {
      stats[product.category]++;
    } else {
      stats[product.category] = 1;
    }
  });

  return stats;
};

module.exports = { calcStats };
