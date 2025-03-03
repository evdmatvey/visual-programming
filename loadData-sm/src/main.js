const { calcStatsFromAPI } = require('./calcStatsFromApi');

async function main() {
  const stats = await calcStatsFromAPI();
  console.log(stats);
}

main();
