import React, { useContext } from 'react';
import { dataContext } from '../hook/DataProvider';
import paperPlane from '../assets/paper-plane-top.svg';

const WeatherInfoCard = ({ title, value, unit, children }) => {
  return (
    <div className="bg-[#1E213A] p-4 rounded text-center md:w-full">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-4xl" style={{ fontSize: '64px', lineHeight: '75.14px' }}>
        {value} {unit}
      </p>
      {children}
    </div>
  );
};

const ProgressBar = ({ value }) => {
  return (
    <div className="w-full bg-zinc-700 rounded-full h-2.5 dark:bg-zinc-700">
      <div className="bg-yellow-300 h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
      <div className="flex justify-between w-full mb-2 text-[#A09FB1]">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
};

export const TimeAnalisys = () => {
  const { data } = useContext(dataContext);

  if (!data || !data.list) return <div>No weather data available</div>;

  const currentWeather = data.list[0];

  return (
    <div className="w-full md:w-3/3 mx-auto mt-16">
      <h2 className="text-xl mb-4 ml-8">Today's Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 p-5">
        <WeatherInfoCard title="Wind status" value={`${currentWeather.wind.speed}`} unit="m/s">
          <div className="flex justify-center items-center">
            <img src={paperPlane} alt="Wind direction" style={{ transform: `rotate(${currentWeather.wind.deg}deg)` }} className="w-6 h-6 mr-2" />
            <p className="font-medium text-lg" style={{ fontSize: '36px', lineHeight: '42.26px' }}>WSW</p>
          </div>
        </WeatherInfoCard>
        <WeatherInfoCard title="Humidity" value={`${currentWeather.main.humidity}`} unit="%">
          <ProgressBar value={currentWeather.main.humidity} />
        </WeatherInfoCard>
        <WeatherInfoCard title="Visibility" value={`${(currentWeather.visibility / 1000).toFixed(1)}`} unit="Miles" />
        <WeatherInfoCard title="Air Pressure" value={`${currentWeather.main.pressure}`} unit="Mb" />
      </div>
      <p className="text-center mt-6">
        created by <span className="text-blue-500">Mauricio Cardozo</span> - devChallenges.io
      </p>
    </div>
  );
};
