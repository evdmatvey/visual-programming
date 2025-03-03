const { loadData } = require('./loadData');
const { calcStats } = require('./calcStats');

const calcStatsFromAPI = async () => {
  try {
    const catsInfo = await loadData();
    const stats = calcStats(catsInfo);
    return stats;
  } catch (error) {
    console.error('Failed to calculate stats:', error);
    throw error;
    return {};
  }
};

module.exports = { calcStatsFromAPI };
