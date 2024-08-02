import React, { useEffect, useState } from 'react';
import { ButtonLocation } from './ButtonLocation';
import cloude from '../asset/Cloud-background.png';

export const WeatherCard = ({ data, toggleModal }) => {
  const [currentTemperature, setCurrentTemperature] = useState('');
  const [currentWeatherDescription, setCurrentWeatherDescription] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentWindDirection, setCurrentWindDirection] = useState(0);

  useEffect(() => {
    const updateWeather = () => {
      if (!data || !data.list || data.list.length === 0) {
        return;
      }

      const currentWeather = data.list[0];

      if (!currentWeather.main || !currentWeather.weather || currentWeather.weather.length === 0) {
        return;
      }

      const temperature = kelvinToCelsius(currentWeather.main.temp);
      const weatherDescription = currentWeather.weather[0].description;
      const windDirection = currentWeather.wind.deg || 0; 

      setCurrentTemperature(temperature.toFixed(2));
      setCurrentWeatherDescription(weatherDescription);
      setCurrentWindDirection(windDirection); 
      setCurrentDate(getCurrentDate());
    };

    const kelvinToCelsius = (temp) => {
      return temp - 273.15;
    };

    const getCurrentDate = () => {
      const date = new Date();
      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-gb', options);
    };

    updateWeather();

    const interval = setInterval(() => {
      updateWeather();
    }, 3 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="relative h-screen w-full md:max-w-[390px] mx-auto bg-[#1E213A] transition-transform duration-300 ease-in-out transform translate-x-0">
      <div className="flex justify-between items-center">
        <button className="bg-[#6E707A] w-[161px] h-10 mt-10 ml-10 hover:bg-gray-600" onClick={toggleModal}>
          Search for places
        </button>
        <ButtonLocation />
      </div>

      <div className="w-full h-2/5 relative">
        <figure className="w-full h-full opacity-20">
          <img src={cloude} alt="" className="object-cover w-full h-full" />
        </figure>

        {data && data.list && data.list.length > 0 && (
          <figure className="w-24 md:w-48 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50">
            <img src={`/icons/${data.list[0].weather[0].icon}.png`} alt="" className="w-full" />
          </figure>
        )}
      </div>

      <div className="mb-8 md:mb-14 text-center">
        <div className="text-[60px] md:text-[144px] leading-none text-center inline-block">
          <span className="text-[#e7e7eb] text-9xl md:text-9xl font-Raleway mt-6">{currentTemperature}</span>
          <span className="text-xl md:text-5xl font-normal text-[#A09FB1]">°C</span>
        </div>
      </div>

      <div className="text-[#A09FB1] text-center text-lg md:text-4xl mt-6 mb-6 md:mb-12">
        <span>{currentWeatherDescription}</span>
      </div>

      <div className="text-[#88869D] text-center mb-4">
        <p className="text-sm md:text-lg">{currentDate}</p>
        <div className="flex justify-center mt-4 md:mt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 md:w-8 md:h-8 mr-2"
            style={{ transform: `rotate(${currentWindDirection}deg)` }}
          >
            <path
              fillRule="evenodd"
              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm md:text-base">{data && data.city && data.city.name ? data.city.name : 'Select a location'}</span>
        </div>
      </div>
    </div>
  );
};
