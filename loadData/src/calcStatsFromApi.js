const loadDataModule = require('./loadData');
const { calcStats } = require('./calcStats');

const calcStatsFromAPI = async () => {
  try {
    const catsInfo = await loadDataModule.loadData();
    const stats = calcStats(catsInfo);
    return stats;
  } catch (error) {
    console.error('Failed to calculate stats:', error);
    throw error;
  }
};

module.exports = { calcStatsFromAPI };
