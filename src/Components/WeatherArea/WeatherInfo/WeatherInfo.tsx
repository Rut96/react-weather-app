import "./WeatherInfo.css";
import humidityImg from '../../../assets/icons/weather-humidity-icon.png'
import windSpeedImg from '../../../assets/icons/wind-speed-icon.png'
import windDirectionImg from '../../../assets/icons/wind-direction-icon.png'

type WeatherInfoProps = {
    cityName: string;
    weatherDescription: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
}

export function WeatherInfo(props: WeatherInfoProps): JSX.Element {
    return (
        <div className="WeatherInfo">
            <div className="weather-header">
                <h2>{props.cityName}</h2>
                <div className="weather-header-info">
                    {props.temperature && <p>{props.temperature}°C</p>}
                    <p >{props.weatherDescription}</p>
                </div>
            </div>
            <div className="other-info">
                {props.humidity &&
                    <p className="weather-info">
                        <img src={humidityImg} />
                        Humidity: {props.humidity}%
                    </p>
                }
                {props.windSpeed &&
                    <p className="weather-info">
                        <img src={windSpeedImg} />
                        Wind Speed: {props.windSpeed} m/s
                    </p>}
                {props.windDirection &&
                    <p className="weather-info">
                        <img src={windDirectionImg} />
                        Wind Direction: {props.windDirection}°
                    </p>}
            </div>
        </div>
    );
}
