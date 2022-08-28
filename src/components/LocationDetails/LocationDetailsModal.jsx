import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';
import { TbMapSearch } from 'react-icons/tb';
import { writeData } from './utils';
import {camelCase, startCase} from 'lodash';
import StarIcon from '@mui/icons-material/Star';

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
        if (locationId <= 0 || locationId > 125) {
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

    const openInNewTab = (lat,long) => {
        const url = `https://www.google.ro/maps/@${lat},${long},13z`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const checkForDecimalAfterDor = number => {
        return number.toString().slice(1) === '' ? number + '.0' : number;
    };

    return (
        <>
            <div className="
                    absolute w-full min-h-[28rem] max-w-sm shadow-lg rounded-lg overflow-hidden z-50
                    sm:top-20 sm:left-10 sm:w-96 my-4
                ">
                <img className="absolute inset-0 transform w-[400px] h-[600px] object-cover -translate-y-4 grayscale-0" src={`/images/locations_images/${location_details.image_url}.jpg`} alt={location_details.name}/>
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
                                            <button
                                                className="bg-green-500 hover:bg-green-700 text-white text-center py-1 px-1 rounded-full h-10 w-10 inline-flex items-center justify-center"
                                                onClick={() => {
                                                    openInNewTab(location_details.coords.lat, location_details.coords.long);
                                                }}
                                            >
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
                                                {startCase(camelCase(location_details.tags[0]))}
                                            </p>
                                            <p className="text-center bg-gray-700 bg-opacity-60 sm:bg-opacity-70 text-white font-bold px-3 rounded-full min-w-min max-w-[90px] whitespace-nowrap overflow-hidden text-ellipsis">
                                                {startCase(camelCase(location_details.tags[1]))}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-xs text-gray-400 mb-2">Overview:</div>
                                        <div className="mb-2 h-[100px] w-[300px] overflow-y-auto scrollbar_description">
                                            <p className={'text-sm text-gray-100 '}>{location_details.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between pb-8">
                                        <div className="flex flex-col items-center w-20 ">
                                            <div className="text-sm text-gray-400 w-18 text-center">Surface:</div>
                                            <div className="release">{location_details.surface} km<sup>2</sup></div>
                                        </div>
                                        <div className="flex flex-col  items-center w-20">
                                            <div className="text-sm text-gray-400 w-18 text-center">Popularity:</div>
                                            <div className="popularity flex items-center justify-between w-20">{checkForDecimalAfterDor(location_details.popularity)}<span>/</span><span className={'flex items-center'}>10 <StarIcon fontSize={'small'}/></span></div>
                                        </div>
                                        <div className="flex flex-col  items-center w-20">
                                            <div className="text-sm text-gray-400 w-18 text-center">Visit time:</div>
                                            <div className="release">~{location_details.visit_time} Hrs</div>
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
