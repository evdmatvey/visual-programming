const { calcStatsFromAPI } = require('../src/calcStatsFromAPI');
const loadDataModule = require('../src/loadData');

jest.mock('../src/loadData');

describe('calcStatsFromAPI', () => {
  it('should return stats successfully', async () => {
    loadDataModule.loadData.mockResolvedValue([
      { country: 'USA' },
      { country: 'Canada' },
    ]);

    const stats = await calcStatsFromAPI();
    expect(stats).toEqual({ USA: 1, Canada: 1 });
  });

  it('should handle errors correctly', async () => {
    loadDataModule.loadData.mockRejectedValue(new Error('Mocked error'));

    try {
      await calcStatsFromAPI();
    } catch (error) {
      expect(error.message).toBe('Mocked error');
    }
  });
});
