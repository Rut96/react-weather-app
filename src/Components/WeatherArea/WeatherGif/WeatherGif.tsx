import "./WeatherGif.css";
import weatherCodes from "../../../wmo-code-description.json"
import sunny from "../../../assets/gifs/sun.gif"
import clear from "../../../assets/gifs/clear.gif"
import mainlyClear from "../../../assets/gifs/mainlyClear.gif"
import partlyCloudy from "../../../assets/gifs/partly-cloudy.gif"
import cloudy from "../../../assets/gifs/cloudy.gif"
import cloudyNight from "../../../assets/gifs/cloudy-night.gif"
import snowy from "../../../assets/gifs/snowy.gif"
import foggy from "../../../assets/gifs/foggy.gif"
import rainy from "../../../assets/gifs/rainy.gif"
import stormy from "../../../assets/gifs/stormy.gif"
import defaultGif from "../../../assets/gifs/sun02.gif"

type WeatherCode = keyof typeof weatherCodes;

interface WeatherGifProps {
    weatherCode: number;
    isDay: number;
}

export function WeatherGif({ weatherCode , isDay}: WeatherGifProps): JSX.Element {
    
    const getGif = (code: number, isDay: number): string => {
        const timeOfDay = isDay === 1 ? "day" : "night";
        const codeString = code.toString() as WeatherCode;
        const weatherInfo = weatherCodes[codeString];

       if (weatherInfo) {
            const gifType = weatherInfo[timeOfDay].gif;
            switch (gifType) {
                case "sunny": return sunny;
                case "clear": return clear;
                case "mainly-clear": return mainlyClear;
                case "partly-cloudy": return partlyCloudy;
                case "cloudy": return cloudy;
                case "cloudy-night": return cloudyNight;
                case "foggy": return foggy;
                case "rainy": return rainy;
                case "snowy": return snowy;
                case "stormy": return stormy;
                default: return defaultGif;
            }
        }
        
        return defaultGif;
    }

    return (
        <div className="WeatherGif">
            {weatherCode !== undefined ? (
                <img src={getGif(weatherCode, isDay)} alt="Weather animation" />
            ) : (
                <p>No weather data available</p>
            )}
        </div>
    );
}
