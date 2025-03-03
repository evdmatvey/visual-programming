const loadData = async () => {
  const url = 'https://catfact.ninja/breeds';
  const allCatsData = [];

  async function fetchPage(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      allCatsData.push(...data.data);

      if (data.next_page_url) {
        await fetchPage(data.next_page_url);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  await fetchPage(url);
  return allCatsData;
};

module.exports = { loadData };
