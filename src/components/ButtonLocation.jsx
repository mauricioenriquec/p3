import React, { useContext, useEffect, useState } from 'react';
import { dataContext } from '../hook/DataProvider';
import LocationCrosshairsIcon from '../assets/location-crosshairs.svg'; 

export const ButtonLocation = () => {
    const { setLocation } = useContext(dataContext);
    const [errorMsg, setErrorMsg] = useState("");

    const success = (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
            lat: latitude,
            lon: longitude,
        });
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            setErrorMsg("Geolocation is not supported by this browser.");
        }
    }, []); 

    return (
        <div>
            <button
                className="text-white mt-10 mr-5"
                onClick={handleClick}
            >
                <img src={LocationCrosshairsIcon} alt="Location Icon" className="w-6 h-6" />
            </button>
            {errorMsg && (
                <div className="text-red-500 mt-2">
                    {errorMsg}
                </div>
            )}
        </div>
    );
};
