const calcStats = (catsInfo) => {
  const countryStats = {};

  catsInfo.forEach((cat) => {
    if (countryStats[cat.country]) {
      countryStats[cat.country]++;
    } else {
      countryStats[cat.country] = 1;
    }
  });

  return countryStats;
};

module.exports = { calcStats };
