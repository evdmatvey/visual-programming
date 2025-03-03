const getDataFromApiModule = require('./getDataFromApi');
const { calcStats } = require('./calcStats');

const calcStatsFromAPI = async () => {
  try {
    const products = await getDataFromApiModule.getDataFromApi();
    const stats = calcStats(products);
    return stats;
  } catch (error) {
    throw error;
  }
};

module.exports = { calcStatsFromAPI };
