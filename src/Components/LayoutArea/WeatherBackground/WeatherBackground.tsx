import { useEffect, useRef, useState } from 'react';
import './WeatherBackground.css';

import clearVideo from '../../../assets/videos/clear.mp4';
import clearNightVideo from '../../../assets/videos/clear-night.mp4';
import cloudyVideo from '../../../assets/videos/cloudy.mp4';
import defaultVideo from '../../../assets/videos/default.mp4';
import rainVideo from '../../../assets/videos/rain.mp4';
import snowVideo from '../../../assets/videos/snow.mp4';
import stormVideo from '../../../assets/videos/storm.mp4';

import weatherCodes from '../../../wmo-code-description.json';

type WeatherCode = keyof typeof weatherCodes;

type WeatherBackgroundProps = {
  weatherCode: number;
  isDay: number;
}

export function WeatherBackground({ weatherCode, isDay }: WeatherBackgroundProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>(defaultVideo);

  const getBackgroundVideo = (code: number, isDay:number): string => {
    if (code === undefined) return defaultVideo;

    const timeOfDay = isDay === 1 ? "day" : "night";
    const codeString = code.toString() as WeatherCode;
    const weatherInfo = weatherCodes[codeString];

    if (weatherInfo) {
      const description = weatherInfo[timeOfDay].description.toLowerCase();
      if (description.includes('sunny')) return clearVideo;
      if (description.includes('clear')) return clearNightVideo;
      if (description.includes('cloud')) return cloudyVideo;
      if (description.includes('rain') || description.includes('drizzle')) return rainVideo;
      if (description.includes('snow')) return snowVideo;
      if (description.includes('thunderstorm')) return stormVideo;
    }

    return defaultVideo;
  };

  useEffect(() => {
    const newSrc = getBackgroundVideo(weatherCode,isDay);
    setVideoSrc(newSrc);
  }, [weatherCode,isDay]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.error("Error playing video:", e));
    }
  }, [videoSrc]);

  return (
    <div className="WeatherBackground">
      <video
        ref={videoRef}
        key={videoSrc} // This key prop will force re-render when source changes
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

