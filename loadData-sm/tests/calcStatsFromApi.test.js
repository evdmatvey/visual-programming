const getDataFromApiModule = require('../src/getDataFromApi');
const { calcStatsFromAPI } = require('../src/calcStatsFromApi');

describe('calcStatsFromAPI', () => {
  it('should return stats successfully', async () => {
    const spy = jest
      .spyOn(getDataFromApiModule, 'getDataFromApi')
      .mockImplementation(async () => {
        return [
          { category: 'groceries' },
          { category: 'groceries' },
          { category: 'furniture' },
        ];
      });

    const stats = await calcStatsFromAPI();
    expect(stats).toEqual({ furniture: 1, groceries: 2 });

    spy.mockRestore();
  });
});
