import { useNavigate } from "react-router-dom";
import { CurrWeatherModel } from "../../../Models/CurrWeatherModel";
import { ForecastModel } from "../../../Models/ForecastModel";
import { Forecast } from "../Forecast/Forecast";
import { WeatherGif } from "../WeatherGif/WeatherGif";
import { WeatherInfo } from "../WeatherInfo/WeatherInfo";
import "./WeatherDetails.css";

type WeatherDetailsProps = {
    weather: CurrWeatherModel;
    forecast: ForecastModel[];
    cityName: string;
    weatherCode?: number;
    isDay?: number;
}

export function WeatherDetails({ weather, forecast, cityName, weatherCode, isDay }: WeatherDetailsProps): JSX.Element {



    return (
        <div className="WeatherDetails">
            <div className="current-weather">
                <WeatherGif weatherCode={weatherCode} isDay={isDay} />
                <WeatherInfo
                    cityName={cityName}
                    weatherDescription={weather.weather_description}
                    temperature={weather.temperature_2m}
                    humidity={weather.relative_humidity_2m}
                    windSpeed={weather.wind_speed_10m}
                    windDirection={weather.wind_direction_10m}
                />
            </div>
            <Forecast forecast={forecast} />
        </div>
    );
}