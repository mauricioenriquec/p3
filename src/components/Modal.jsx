import React, { useContext, useState } from 'react';
import SearchModal from './SearchModal';
import { dataContext } from '../hook/DataProvider';
import { WeatherCard } from './WeatherCard';

function Modal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [location, setLocation] = useState('');
    const {data } = useContext(dataContext);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="relative h-screen sm:w-full md:w-96 bg-[#100E1D] text-white">
            <WeatherCard data={data} toggleModal={toggleModal} />
            <SearchModal 
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                location={location}
                setLocation={setLocation}
            />
        </div>
    );
}

export default Modal;