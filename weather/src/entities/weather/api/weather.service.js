import fakeFetchedWeather from '@/shared/assets/example-sity.query.json';
import { formatFetchedWeather } from '../lib/formatFetchedWeather';

class WeatherService {
  mode = 'prod';

  constructor(mode) {
    this.mode = mode;
  }

  async fetchWeathersList(lat, lon) {
    if (this.mode === 'dev') {
      const data = this._loadWeathersListFromJson();
      return formatFetchedWeather(data);
    } else {
      const data = await this._loadWeathersListFromApi(lat, lon);
      return formatFetchedWeather(data);
    }
  }

  async _loadWeathersListFromApi(lat, lon) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=69a5435905d7d433b1f8ebfd41069c4f&units=metric`,
      );
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  _loadWeathersListFromJson() {
    return fakeFetchedWeather;
  }
}

export const weatherService = new WeatherService('prod');
