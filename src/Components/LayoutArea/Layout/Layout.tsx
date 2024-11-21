import { useState } from "react";
import { CurrWeatherModel } from "../../../Models/CurrWeatherModel";
import { ForecastModel } from "../../../Models/ForecastModel";
import { weatherService } from "../../../Services/WeatherService";
import { Routing } from "../Routing/Routing";
import { Search } from "../Search/Search";
import { WeatherBackground } from "../WeatherBackground/WeatherBackground";
import "./Layout.css";
import { useNavigate } from "react-router-dom";

export function Layout(): JSX.Element {
    const [weatherData, setWeatherData] = useState<CurrWeatherModel>();
    const [forecastData, setForecastData] = useState<ForecastModel>();
    const [cityName, setCityName] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = async (city: string) => {
        try {
            setCityName(city);
            const data = await weatherService.getWeatherData(city);
            setWeatherData(data.current);
            setForecastData(data.daily);
            console.log("Set forecast data:", data.daily);
            navigate("/");
        } catch (err) {
            console.log(err);
            navigate("*");
        }
    };

    return (
        <div className="Layout">
            <WeatherBackground weatherCode={weatherData?.weather_code} isDay={weatherData?.is_day} />
            <div className="weather-card">
                <header>
                    <Search onSearch={handleSearch} />
                </header>
                <main>
                    <Routing
                        weatherData={weatherData}
                        forecastData={forecastData}
                        cityName={cityName}
                        weatherCode={weatherData?.weather_code}
                        isDay={weatherData?.is_day}
                    />
                </main>
            </div>
        </div>
    );
}

