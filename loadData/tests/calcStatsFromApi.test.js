const loadDataModule = require('../src/loadData');
const { calcStatsFromAPI } = require('../src/calcStatsFromAPI');

describe('calcStatsFromAPI', () => {
  it('should return stats successfully', async () => {
    const spy = jest
      .spyOn(loadDataModule, 'loadData')
      .mockImplementation(async () => {
        return [{ country: 'USA' }, { country: 'Canada' }];
      });

    const stats = await calcStatsFromAPI();
    expect(stats).toEqual({ USA: 1, Canada: 1 });

    spy.mockRestore();
  });

  it('should handle errors correctly', async () => {
    const spy = jest
      .spyOn(loadDataModule, 'loadData')
      .mockImplementation(async () => {
        throw new Error('Mocked error');
      });

    try {
      await calcStatsFromAPI();
    } catch (error) {
      expect(error.message).toBe('Mocked error');
    }

    spy.mockRestore();
  });
});
