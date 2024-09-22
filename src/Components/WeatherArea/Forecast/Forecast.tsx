import { useEffect, useState } from "react";
import { ForecastModel } from "../../../Models/ForecastModel";
import sunriseIcon from '../../../assets/icons/sunrise.png';
import sunsetIcon from '../../../assets/icons/sunset.png';
import "./Forecast.css";

type ForecastProps = {
    forecast: ForecastModel;
}

export function Forecast({ forecast }: ForecastProps): JSX.Element {

    // const [forecastData, setForecastData] = useState<ForecastModel[]>([]);

    // useEffect(() => {
    //     console.log("Forecast component received props:", forecast);
    //     // setForecastData(forecast);/
    // }, [forecast]);


    const getDayName = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    const getForecast = (): ForecastModel => {
        return forecast as undefined as ForecastModel;
    }

    // const getWindArrowStyle = (degrees: number) => {
    //     return {
    //         transform: `rotate(${degrees}deg)`
    //     };
    // };


    return (
        <div className="Forecast">
            <h2 className="forecast-header">7-Day Forecast</h2>
            <div className="forecast-scroll-container">
                {forecast ? (
                    <div className="forecast-list">
                        {getForecast().time.map((_, index) => (
                            <div key={index} className="forecast-day">
                                <h3>{getDayName(forecast.time[index])}</h3>
                                <p>{forecast.temperature_2m_max[index]}°C / {forecast.temperature_2m_min[index]}°C</p>
                                <p>Wind: {forecast.wind_speed_10m_max[index]} m/s</p>
                                <p><img src={sunriseIcon} /> {forecast.sunrise[index].split('T')[1]} <img src={sunsetIcon} /> {forecast.sunset[index].split('T')[1]}</p>
                                <p>{forecast.weather_description[index]}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No forecast data available</p>
                )}
            </div>

        </div>
    );
}