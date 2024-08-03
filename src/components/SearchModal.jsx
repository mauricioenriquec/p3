import React, { useContext } from 'react';
import { dataContext } from '../hook/DataProvider';

function SearchModal({ isModalOpen, toggleModal, location, setLocation }) {
    const { getDataByCty } = useContext(dataContext); 

    const handleSearchButtonClick = () => {
        getDataByCty(location);
        toggleModal();
    };

    const handleLocationButtonClick = (city) => {
        getDataByCty(city);
        toggleModal();
    };

    const handleLocationInputChange = (e) => {
        setLocation(e.target.value);
    };

    return (
        <div className={`fixed top-0 left-0 h-full w-full md:w-[385px] bg-[#1E213A] text-white transition-transform duration-300 ease-in-out transform ${isModalOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <button className="absolute top-4 right-4 text-white text-3xl p-2 hover:bg-gray-700 rounded-full" onClick={toggleModal}
                style={{ fontSize: '1.875rem', lineHeight: '0.25rem' }}>×</button>
            
            <div className="p-6 pt-12">
                <div className="relative mb-6">
                    <input 
                        type="text" 
                        placeholder="search location" 
                        className="w-full py-3 px-12 bg-[#1E213A] border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={location}
                        onChange={handleLocationInputChange}
                    />
                    <button 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#3C47F5] text-white py-2 px-4 hover:bg-blue-600"
                        onClick={handleSearchButtonClick}
                    >
                        Search
                    </button>
                </div>

                <div className="space-y-4">
                    <button onClick={() => handleLocationButtonClick('London')} className="w-full py-4 px-6 bg-[#1E213A] border border-customgraytwo rounded-md text-left text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-raleway">London</button>
                    <button onClick={() => handleLocationButtonClick('Moscow')} className="w-full py-4 px-6 bg-[#1E213A] border border-customgraytwo rounded-md text-left text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-raleway">Moscow</button>
                    <button onClick={() => handleLocationButtonClick('Caracas')} className="w-full py-4 px-6 bg-[#1E213A] border border-customgraytwo rounded-md text-left text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-raleway">Caracas</button>
                    <button onClick={() => handleLocationButtonClick('New York')} className="w-full py-4 px-6 bg-[#1E213A] border border-customgraytwo rounded-md text-left text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-raleway">New York</button>
                </div>
            </div>
        </div>
    );
}

export default SearchModal;