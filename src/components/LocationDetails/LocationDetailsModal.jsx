import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';
import { TbMapSearch } from 'react-icons/tb';
import { writeData } from './utils';
import { capitalize } from 'lodash';
import _ from 'lodash';
const LocationDetailsModal = ({ locationId, location_details, visited_locations, onModalLocationsChanged, onHandleChildCloseModal }) => {
    const [check, setCheck] = useState(true);
    
    useEffect(() => {
        isChecked();
    }, []);

    const isChecked = () => {
        if (visited_locations.includes(locationId.toString())) {
            setCheck(false);
        } else {
            setCheck(true);
        }
    };

    const updateLocations = (locationId) => {
        if (locationId <= 0 || locationId > 100) {
            return;
        }
        const _newLocations = visited_locations;
        if (_newLocations[locationId]) {
            delete _newLocations[locationId];
        }
        else {
            _newLocations[locationId] = `${locationId}`;
        }
        onModalLocationsChanged(_newLocations);
        writeData(_newLocations);
    };

    return (
        <>
            <div className="
                    absolute w-full min-h-[28rem] max-w-sm shadow-lg rounded-lg overflow-hidden z-50
                    sm:top-20 sm:left-10 sm:w-96 my-4
                ">
                <img className="absolute inset-0 transform w-full -translate-y-4 grayscale-0" src={location_details.image_url} />
                <div className='flex max-w-sm w-full shadow-md rounded-lg overflow-hidden mx-auto'>
                    <div className="overflow-hidden relative transform shadow-lg text-white w-full">
                        <div className="absolute inset-0 top-64 z-10 bg-gradient-to-t from-black via-black to-transparent"></div>
                        <div className="relative  group z-10 px-10 pt-10 space-y-6">
                            <div className="align-self-end w-full">
                                <div className="absolute inset-x-0 top-0 pt-5 w-full mx-auto text-2xl uppercase text-center drop-shadow-sm font-bold text-white">
                                    <span className='bg-black bg-opacity-40 px-2 shadow-stone-900 rounded-tl-lg rounded-br-lg'>{location_details.location}</span>
                                </div>
                                <div className="h-[22rem]"></div>
                                <div className="relative space-y-2">
                                    <div className='relative flex'>
                                        <div className="flex flex-col w-4/6 space-y-2">
                                            <h3 className="text-2xl min-h-[96px] font-bold text-white flex items-center transition duration-300 ease-in-out ">{location_details.name}</h3>
                                        </div>
                                        <div className='flex justify-end w-2/6 gap-2 items-center top-1 relative'>
                                            <button className="bg-green-500 hover:bg-green-700 text-white text-center py-1 px-1 rounded-full h-10 w-10 inline-flex items-center justify-center">
                                                <TbMapSearch className='text-2xl' />
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white text-center py-1 px-1 rounded-full h-10 w-10 inline-flex items-center justify-center"
                                                onClick={
                                                    () => {
                                                        updateLocations(locationId);
                                                        isChecked();
                                                    }
                                                }>
                                                {check ?
                                                    <FaCheck className='text-xl' />
                                                    :
                                                    <RiCloseFill className='text-xl scale-150' />
                                                }
                                            </button>
                                        </div>
                                        
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="mb-0 text-xs text-gray-400 w-3/4 leading-5 flex gap-2">
                                            <p onClick={onHandleChildCloseModal} className="text-center bg-gray-700 bg-opacity-60 sm:bg-opacity-70 text-white font-bold px-3 rounded-full min-w-min max-w-[90px] whitespace-nowrap overflow-hidden text-ellipsis">
                                                {capitalize(location_details.tags[0])}
                                            </p>
                                            <p className="text-center bg-gray-700 bg-opacity-60 sm:bg-opacity-70 text-white font-bold px-3 rounded-full min-w-min max-w-[90px] whitespace-nowrap overflow-hidden text-ellipsis">
                                                {capitalize(location_details.tags[1])}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col"></div>
                                        <div className="text-xs text-gray-400 mb-2">Overview:</div>
                                        <span className="text-sm text-gray-100 mb-2 h-[100px] w-[300px] overflow-auto scrollbar-hide">
                                            {location_details.description}
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between pb-8">
                                        <div className="flex flex-col items-center ">
                                            <div className="text-sm text-gray-400">Distance:</div>
                                            <div className="release">{location_details.distance}km</div>
                                        </div>
                                        <div className="flex flex-col  items-center ">
                                            <div className="text-sm text-gray-400">Popularity:</div>
                                            <div className="popularity">{location_details.popularity}</div>
                                        </div>
                                        <div className="flex flex-col  items-center ">
                                            <div className="text-sm text-gray-400">Visit time:</div>
                                            <div className="release">{location_details.visit_time} min</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LocationDetailsModal;
