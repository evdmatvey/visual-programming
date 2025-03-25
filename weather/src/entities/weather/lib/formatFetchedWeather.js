const groupAndSortByDate = (data) => {
  const groupedData = {};

  data.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];

    if (!groupedData[date]) {
      groupedData[date] = [];
    }

    groupedData[date].push(item);
  });

  for (const date in groupedData) {
    groupedData[date].sort((a, b) => {
      const timeA = a.dt_txt.split(' ')[1];
      const timeB = b.dt_txt.split(' ')[1];
      return timeA.localeCompare(timeB);
    });
  }

  return groupedData;
};

const removeUnusedFieldsFromList = (list) =>
  list.map((weather) => {
    return {
      dt: weather.dt,
      main: weather.main,
      weather: weather.weather[0],
      wind: weather.wind,
      dt_txt: weather.dt_txt,
    };
  });

export const formatFetchedWeather = (fetchedWeather) => {
  const { list } = fetchedWeather;
  const mappedList = removeUnusedFieldsFromList(list);
  const groupedWeatherList = groupAndSortByDate(mappedList);
  const todayDate = new Date().toISOString().split('T')[0];

  return { weatherList: groupedWeatherList, currentWeather: groupedWeatherList[todayDate][0] };
};
