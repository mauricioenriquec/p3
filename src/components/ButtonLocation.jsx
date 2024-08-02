import React, { useContext, useEffect, useState } from 'react';
import { dataContext } from '../hooks/DataProvider';

export const ButtonLocation = () => {
    const { setLocation } = useContext(dataContext);
    const [geolocation, setGeoLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    
    const success = (position) => {
        const { latitude, longitude } = position.coords;
        setGeoLocation({ latitude, longitude });
        setErrorMsg(""); 
    };

    
    const error = (err) => {
        console.error(`ERROR(${err.code}): ${err.message}`);
        setErrorMsg("Unable to retrieve your location. Please check your settings.");
    };

    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
    };

    
    const handleClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(success, error, options);
        } else {
            setErrorMsg("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        if (geolocation) {  
            setLocation({
                lat: geolocation.latitude,
                lon: geolocation.longitude,
            });
        }
    }, [geolocation, setLocation]); 

    return (
        <div>
            <button
                className="text-white mt-10 mr-5"
                onClick={handleClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2.25c5.376 0 9.75 4.374 9.75 9.75s-4.374 9.75-9.75 9.75S2.25 17.376 2.25 12 6.624 2.25 12 2.25zm0 4.5a.75.75 0 100 1.5.75.75 0 000-1.5zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                </svg>
            </button>
            {errorMsg && (
                <div className="text-red-500 mt-2">
                    {errorMsg}
                </div>
            )}
        </div>
    );
};
