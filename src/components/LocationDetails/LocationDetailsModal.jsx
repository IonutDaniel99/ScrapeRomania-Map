import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';
import { TbMapSearch } from 'react-icons/tb';
import { writeData } from './utils';
import PropTypes from 'prop-types';

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
        absolute w-full min-h-[28rem] max-w-sm bg-black shadow-lg rounded-lg overflow-hidden z-50
        sm:top-20 sm:left-10 sm:w-96 my-4
      ">
                <div>
                    <div className='flex max-w-sm w-full min-h-[28rem] bg-black shadow-md rounded-lg overflow-hidden mx-auto'>
                        <div className='w-2 bg-gray-800'></div>
                        <div className="overflow-hidden rounded-xl relative transform shadow-lg hover:shadow-2xl  text-white">
                            <div className="absolute inset-0 top-80 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-black to-transparent"></div>
                            <div className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6">
                                <div className="align-self-end w-full">
                                    <div className="h-[22rem]"></div>
                                    <div className="relative space-y-2">
                                        <div className='relative flex'>
                                            <div className="flex flex-col space-y-2 w-3/5 ">
                                                <h3 className="text-2xl font-bold text-white">Bran Castle</h3>
                                                <div className="mb-0 text-xs text-gray-400 w-3/4 leading-5 flex gap-2">
                                                    <p className="bg-gray-700 bg-opacity-60 sm:bg-opacity-70 text-white font-bold px-3 rounded-full min-w-min max-w-[90px] whitespace-nowrap overflow-hidden text-ellipsis">
                                                        Vampires
                                                    </p>
                                                    <p className="bg-gray-700 bg-opacity-60 sm:bg-opacity-70 text-white font-bold px-3 rounded-full min-w-min max-w-[90px]">
                                                        Vampires
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='w-2/5 flex justify-around items-center'>
                                                <button className="bg-green-500 hover:bg-green-700 text-white text-center py-1 px-1 rounded-full h-12 w-12 inline-flex items-center justify-center">
                                                    <TbMapSearch className='text-2xl' />
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-700  text-white text-center py-1 px-1 rounded-full h-12 w-12 inline-flex items-center justify-center"
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
                                        <div className="flex flex-col overview">
                                            <div className="flex flex-col"></div>
                                            <div className="text-xs text-gray-400 mb-2">Overview:</div>
                                            <p className="text-sm text-gray-100 mb-2">
												Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.
                                            </p>
                                        </div>
                                        <div className="flex flex-row justify-between pb-8">
                                            <div className="flex flex-col items-center ">
                                                <div className="text-sm text-gray-400">Distance:</div>
                                                <div className="release">155km</div>
                                            </div>
                                            <div className="flex flex-col  items-center ">
                                                <div className="text-sm text-gray-400">Popularity:</div>
                                                <div className="popularity">440.052</div>
                                            </div>
                                            <div className="flex flex-col  items-center ">
                                                <div className="text-sm text-gray-400">Visit time:</div>
                                                <div className="release">155 min</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-countdown="2021-09-15" className="absolute inset-x-0 top-0 pt-5 w-full mx-auto text-2xl uppercase text-center drop-shadow-sm font-bold text-white">Brasov</div>
                                </div>
                            </div>
                            <img className="absolute inset-0 transform w-full -translate-y-4 grayscale-0" src="http://www.bran-castle.com/assets/castle/06-full.jpg" />

                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};

export default LocationDetailsModal;
