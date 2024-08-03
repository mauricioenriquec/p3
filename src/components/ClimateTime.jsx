import React, { useContext, useState } from 'react';
import { dataContext } from '../hook/DataProvider';
import { TimeAnalisys } from './TimeAnalisys';

export const ClimateTime = () => {
    const { data } = useContext(dataContext);
    const [unit, setUnit] = useState('C');

    
    if (!data || !data.list) return <div>No weather data available</div>;

    
    const forecasts = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

    
    const convertTemperature = (temp) => {
        if (unit === 'C') {
            return Math.round(temp - 273.15);
        } else if (unit === 'F') {
            return Math.round((temp - 273.15) * 9 / 5 + 32);
        }
        return temp;
    };

    return (
        <div className="flex-grow flex justify-center mb-16">
            <div className="w-full max-w-6xl mx-auto relative mt-8">
                {}
                <div className="flex justify-end mb-4 space-x-4">
                    <button
                        className={`p-2 rounded-full ${unit === 'C' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                        style={{ width: '40px', height: '40px' }}
                        onClick={() => setUnit('C')}
                    >
                        °C
                    </button>
                    <button
                        className={`p-2 rounded-full ${unit === 'F' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
                        style={{ width: '40px', height: '40px' }}
                        onClick={() => setUnit('F')}
                    >
                        °F
                    </button>
                </div>

                {}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pr-5 pl-5">
                    {forecasts.slice(0, 5).map((forecast, index) => (
                        <div key={index} className="bg-[#1E213A] p-4  rounded-lg text-center">
                            <p className="text-xs mb-1 py-2">
                                {new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </p>
                            <img
                                src={`/icons/${forecast.weather[0].icon}.png`}
                                alt="weather icon"
                                className="mx-auto w-11 h-11 items-center"
                            />
                            <p className="text-xs py-2">
                                <span className="font-semibold">{convertTemperature(forecast.main.temp_max)}°{unit} Mx - </span> {convertTemperature(forecast.main.temp_min)}°{unit} Mn
                            </p>
                        </div>
                    ))}
                </div>

                {}
                <TimeAnalisys />
            </div>
        </div>
    );
};


