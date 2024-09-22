import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { WeatherDetails } from "../../WeatherArea/WeatherDetails/WeatherDetails";
import { Page404 } from "../Page404/Page404";
import { CurrWeatherModel } from "../../../Models/CurrWeatherModel";
import { ForecastModel } from "../../../Models/ForecastModel";

type RoutingProps = {
    weatherData: CurrWeatherModel;
    forecastData: ForecastModel;
    cityName: string;
    weatherCode?: number;
    isDay?: number;
}

export function Routing(props: RoutingProps): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={
                    props.weatherData && props.forecastData &&
                    <WeatherDetails
                        weather={props.weatherData}
                        forecast={props.forecastData}
                        cityName={props.cityName}
                        weatherCode={props.weatherCode}
                        isDay={props.isDay}
                    />
                } />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
