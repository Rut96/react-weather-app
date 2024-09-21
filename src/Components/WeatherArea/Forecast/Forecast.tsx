import { useEffect, useState } from "react";
import { ForecastModel } from "../../../Models/ForecastModel";
import "./Forecast.css";

type ForecastProps = {
    forecast: ForecastModel[];
}

export function Forecast({ forecast }: ForecastProps): JSX.Element {

    // const [forecastData, setForecastData] = useState<ForecastModel[]>([]);

    useEffect(() => {
        console.log("Forecast component received props:", forecast);
        // setForecastData(forecast);/
    }, [forecast]);


    const getDayName = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    const getForecast = (): ForecastModel => {
        return forecast as undefined as ForecastModel;
    }



    return (
        <div className="Forecast">
            <h2>7-Day Forecast</h2>
            {forecast ? (
                <div className="forecast-list">
                    {
                        getForecast().time.map((_, index) => (
                            <div key={index} className="forecast-day">
                                <h3>{getDayName(getForecast().time[index])}</h3>
                                <p>Max: {getForecast().temperature_2m_max[index]}°C</p>
                                <p>Min: {getForecast().temperature_2m_min[index]}°C</p>
                                <p>Wind: {getForecast().wind_speed_10m_max[index]} m/s</p>
                            </div>
                        ))

                    }
                </div>
            ) : (
                <p>No forecast data available</p>
            )}
        </div>
    );
}