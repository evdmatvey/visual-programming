const getDataFromApi = async () => {
  const url = 'https://dummyjson.com/products';
  const response = await fetch(url);

  if (!response.ok) throw new Error('Error on fetching data!');

  const data = await response.json();

  return data.products;
};

module.exports.getDataFromApi = getDataFromApi;
