const loadData = async () => {
  const url = 'https://catfact.ninja/breeds';
  const allCatsData = [];
  const queue = [url];

  while (queue.length > 0) {
    const currentUrl = queue.shift();

    try {
      const response = await fetch(currentUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      allCatsData.push(...data.data);

      if (data.next_page_url) {
        queue.push(data.next_page_url);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  return allCatsData;
};

module.exports.loadData = loadData;
