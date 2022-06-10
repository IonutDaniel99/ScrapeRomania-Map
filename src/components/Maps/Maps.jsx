import React, { useEffect, useReducer, useRef, useState } from 'react';
import LocationDetailsModal from '../LocationDetails/LocationDetailsModal';
import { getLocatiosToVisit, getUserVisitedLocations } from '../../utils/firebaseUtils';
import { startWorldMap } from './utils';
import countries from '../../data/countries.json';

const Maps = () => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [locationsList, setLocationsList] = useState();
    const [visitedLocations, setVisitedLocations] = useState();
    const [isLoading, setIsLoading] = useState(true);
    // Modal Logic
    const [locationId, setLocationId] = useState(0);
    const [lastLocationId, setLastLocationId] = useState(0);
    const [locationDetails, setLocationDetails] = useState();
    const [locationDetailsIsOpen, setLocationDetailsIsOpen] = useState(false);

    useEffect(() => {
        const a = fetchLocationToVisit();
        const b = fetchUserVisitedLocations();
        Promise.all([a, b]).then(values => {
            setLocationsList(values[0]);
            setVisitedLocations(Object.keys(values[1]).map(function (key) { return values[1][key] = `${key}`; }));
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        });
    }, []);

    const fetchLocationToVisit = () => getLocatiosToVisit().then(locationsToVisit => { return locationsToVisit; });
    const fetchUserVisitedLocations = () => getUserVisitedLocations().then(userVisitedLocations => { return userVisitedLocations; });

    const onModalLocationsChanged = (newLocations) => {
        setVisitedLocations(newLocations);
        forceUpdate();
    };

    const locationModalLogic = (index) => {
        if (index !== lastLocationId) {
            setLocationDetailsIsOpen(true);
            setLastLocationId(index);
            setLocationId(index);
        } else {
            if (index === lastLocationId) {
                setLocationDetailsIsOpen(false);
                setLastLocationId(0);
            } else {
                setLocationDetailsIsOpen(true);
            }
        }

    };

    const onHandleChildCloseModal = () => {
        setLocationDetailsIsOpen(false);
    };

    setTimeout(() => {
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        startWorldMap(ctx);
        console.log('swdone');
    }, 2000);

    return (
        <>
            <div className='flex flex-wrap max-h-[200px] max-w-[900px] whitespace-normal'>
                <canvas width="450" height="450" style={{ border: '2px solid red', position: 'absolute', top: '0px' }}></canvas>
                {/* {isLoading
                    ?
                    <div> Loading </div>
                    :
                    Object.keys(locationsList).map((x, i) => {
                        const locationId = i + 1;
                        if (visitedLocations.includes((locationId).toString())) {
                            return (<span onClick={() => {
                                locationModalLogic(locationId);
                                setLocationDetails(locationsList[x]);
                            }} key={locationId} className='flex justify-center items-center w-10 h-10 bg-blue-500 rounded-full px-2 text-white cursor-pointer'>{locationId}</span>);
                        } else {
                            return (<span onClick={() => {
                                locationModalLogic(locationId);
                                setLocationDetails(locationsList[x]);
                            }} key={locationId} className='flex justify-center items-center w-10 h-10 bg-red-500 rounded-full px-2 text-white cursor-pointer'>{locationId}</span>);
                        }
                    })
                } */}
            </div>
            {locationDetailsIsOpen &&
                <LocationDetailsModal
                    key={locationId}
                    locationId={locationId}
                    location_details={locationDetails}
                    visited_locations={visitedLocations}
                    onModalLocationsChanged={onModalLocationsChanged}
                    onHandleChildCloseModal={onHandleChildCloseModal} />}
        </>
    );
};

export default Maps;