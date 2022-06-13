/* eslint-disable */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import LocationDetailsModal from '../LocationDetails/LocationDetailsModal';
import { getLocatiosToVisit, getUserVisitedLocations } from '../../utils/firebaseUtils';

import countries from '../../data/countries.json';
import coords from '../../dummy/coordsD.json';
import panzoom from 'panzoom';

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

    const gPanZoomRef = useRef(null);
    useEffect(()=>{
        if(gPanZoomRef.current == null) return;
        panzoom(gPanZoomRef.current)
    },[gPanZoomRef])

    return (
        <>
            <div className='relative' ref={gPanZoomRef}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="tiny" width={window.innerWidth} height={window.innerHeight}>
                    {
                        Object.values(coords).map((location, i) => {
                            const svg_ref = useRef(null);
                            if (svg_ref.current != null && document.getElementById("location_svg_"+i) == null){
                                let name = document.createElement("div");
                                name.setAttribute("id", `location_svg_${i}`);
                                name.setAttribute("class", 'absolute top-0 left-0')
                                name.setAttribute("style", `transform: translate(${location.number_coords[0]}px,${location.number_coords[1]}px)`);
                                name.innerHTML = location.number;
                                svg_ref.current.parentElement.parentNode.append(name);
                            }
                            return (
                                <svg key={i} ref={svg_ref} >
                                    <g key={i} xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth=".98" fill="#FFFFFF" aria-valuetext="test" >
                                        <path key={i} d={location.path} 
                                        onClick={() => {
                                            console.log(location.card_data.name)
                                        }} 
                                        fill={location.card_data.name === "Necunoscut" ? "red" : "transparent"} />
                                    </g>
                                </svg>
                            )
                        })
                    }
                </svg>
            </div>
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