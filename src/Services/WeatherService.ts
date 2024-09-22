import axios from "axios";
import citiesData from "../cities500.json";
import { CurrWeatherModel } from "../Models/CurrWeatherModel";
import { ForecastModel } from "../Models/ForecastModel";
import { appConfig } from "../Utils/AppConfig";
import weatherCodes from "../wmo-code-description.json";


type City = {
    name: string;
    lat: string;
    lon: string;
}

type WeatherResponse = {
    current: CurrWeatherModel;
    daily: ForecastModel;
}

class WeatherService {

    private cities: City[];

    constructor() {
        this.cities = citiesData as City[];
    }

    private findCity(cityName: string): City | undefined {
        return this.cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());
    }

    private getWeatherDescription(weatherCode: number, isDay: boolean): string {
        const weatherInfo = weatherCodes[weatherCode.toString() as keyof typeof weatherCodes];
        if (weatherInfo) {
            const timeOfDay = isDay ? "day" : "night";
            return weatherInfo[timeOfDay].description;
        }
        return "Unknown weather condition";
    }

    public async getWeatherData(cityName: string): Promise<WeatherResponse> {
        const city = this.findCity(cityName);
        if (!city) {
            throw new Error('City not found');
        }

        const params = {
            latitude: city.lat,
            longitude: city.lon,
            current: ['temperature_2m', 'relative_humidity_2m', 'is_day', 'precipitation', 'weather_code', 'wind_speed_10m', 'wind_direction_10m'],
            daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset', 'wind_speed_10m_max', 'wind_direction_10m_dominant'],
            timezone: 'auto'
        };

        try {
            const response = await axios.get<WeatherResponse>(appConfig.wetherApiUrl, { params });

            // const weatherInfo = weatherCodes[response.data.current.weather_code?.toString() as keyof typeof weatherCodes];

            // if (weatherInfo) {
            //     const timeOfDay = response.data.current.is_day === 1 ? "day" : "night";
            //     response.data.current.weather_description = weatherInfo[timeOfDay].description;
            // }

            // Process current weather
            const currentWeather = response.data.current;
            currentWeather.weather_description = this.getWeatherDescription(
                currentWeather.weather_code as number,
                currentWeather.is_day === 1
            );

            // Process forecast
            const forecastData = response.data.daily;
            forecastData.weather_description = forecastData.weather_code.map((code, index) => {
                // Assume daytime for forecast (you might want to adjust this logic)
                return this.getWeatherDescription(code, true);
            });


            const weatherData = {
                current: response.data.current,
                daily: response.data.daily
            };

            console.log("Processed Weather Data:", weatherData);
            return weatherData;

        } catch (err: any) {
            console.log(err);
            throw new Error('Failed to fetch weather data');
        }
    }

}

export const weatherService = new WeatherService();
