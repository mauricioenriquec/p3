import { createContext, useEffect, useState } from "react";

export const dataContext = createContext();

export const DataProvide = ({ children }) => {
    const [data, setData] = useState([]);
    const [city, setCity] = useState('');
    const [location, setLocation] = useState(null); // Inicializar como null para objetos

    // Obtener los datos del clima por latitud y longitud
    const getData = async (lat, lon) => {
        try {
            const rs = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9174ddaf8fa6b3aa86b127d7c27fd64d`);
            const rsJson = await rs.json();
            setData(rsJson);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    // Obtener los datos del clima por el nombre de la ciudad
    const getDataByCty = async (cityName) => {
        try {
            const rs = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=9174ddaf8fa6b3aa86b127d7c27fd64d`);
            const rsJson = await rs.json();
            console.log(rsJson);
            setData(rsJson);
        } catch (error) {
            console.error('Error fetching city name weather:', error);
        }
    };

    // Obtener el nombre de la ciudad por latitud y longitud
    const getCityName = async (lat, lon) => {
        try {
            const rs = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9174ddaf8fa6b3aa86b127d7c27fd64d`);
            const rsJson = await rs.json();
            setCity(rsJson.name);
        } catch (error) {
            console.error('Error fetching city name:', error);
        }
    };

    useEffect(() => {
        if (location) {  
            const { lat, lon } = location;
            getData(lat, lon);
            getCityName(lat, lon);
        }
    }, [location]);

    return (
        <dataContext.Provider value={{
            data,
            city,
            setLocation,
            getDataByCty
        }}>
            {children}
        </dataContext.Provider>
    );
};
