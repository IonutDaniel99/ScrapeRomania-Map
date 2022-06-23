import React, { useEffect, useReducer, useRef, useState } from 'react';
import LocationDetailsModal from '../LocationDetails/LocationDetailsModal';
import { getLocatiosToVisit, getUserVisitedLocations } from '../../utils/firebaseUtils';
import { Transition } from '@tailwindui/react';

import coords from '../../data/locationsRomania.json';
import panzoom from 'panzoom';

const Maps = () => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [locationsList, setLocationsList] = useState(coords);
    const [visitedLocations, setVisitedLocations] = useState();
    const [isLoading, setIsLoading] = useState(true);
    // Modal Logic
    const [locationId, setLocationId] = useState(0);
    const [lastLocationId, setLastLocationId] = useState(0);
    const [locationDetails, setLocationDetails] = useState();
    const [locationDetailsIsOpen, setLocationDetailsIsOpen] = useState(false);

    const locationsNumberRef = useRef(null);
    const [displayPanZoomDisplayNumbers, setDisplayPanZoomDisplayNumbers] = useState(false);
    const [isPanMoving, setIsPanMoving] = useState(false);

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
        console.log(index);
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
    useEffect(() => {

        if (gPanZoomRef.current == null) return;
        const instance = panzoom(gPanZoomRef.current, {
            transformOrigin: { x: 0.5, y: 0.5 },
            maxZoom: 6,
            minZoom: 1,
            smoothScroll: false,
            zoomSpeed: 0.5,
            bounds: {
                left: 700,
                right: 500,
                top: 200,
                bottom: 200
            },
            boundsPadding: 0.6,
            onTouch: function () {
                console.log('doubleee');
                return false; // tells the library to not preventDefault.
            },
            onDoubleClick: function () {
                console.log('double');
                return false; // tells the library to not preventDefault, and not stop propagation
            }
        });

        instance.on('pan', () => {
            setIsPanMoving(true);
        });
        instance.on('panend', () => {
            setIsPanMoving(false);
        });
        instance.on('zoom', (e) => {
            if (e.getTransform().scale > 2.5) {
                setDisplayPanZoomDisplayNumbers(true);
            }
            else {
                setDisplayPanZoomDisplayNumbers(false);
            }
        });
    }, []);

    const svg_ref = useRef(null);

    return (
        <>
            <div className='relative' ref={gPanZoomRef}>
                {
                    isLoading ? 'DA' :
                        <>
                            <div id="locations_numbers" ref={locationsNumberRef} style={{ visibility: displayPanZoomDisplayNumbers ? 'visible' : 'hidden' }}></div>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="tiny" width={1200} height={800}>
                                {Object.values(locationsList).map((location, i) => {
                                    const locationId = i + 1;
                                    if (svg_ref.current != null && document.getElementById('location_svg_' + i) == null) {
                                        let name = document.createElement('div');
                                        name.setAttribute('id', `location_svg_${i}`);
                                        name.setAttribute('class', 'absolute top-0 left-0 text-[6px] ml-1 mt-[10px] font-semibold');
                                        name.setAttribute('style', `transform: translate(${location.number_coords[0]}px,${location.number_coords[1]}px)`);
                                        name.innerHTML = location.number;
                                        locationsNumberRef.current.appendChild(name);
                                    }
                                    if (!isLoading) {
                                        if (visitedLocations.includes((locationId).toString())) {
                                            return (
                                                <svg key={i} ref={svg_ref} strokeWidth='.50'>
                                                    <defs>
                                                        <pattern id={'img_pattern_'+locationId} patternUnits="userSpaceOnUse" width="600" height="1000">
                                                            <image href = {location.card_data.image_url} x="0" y="200" width="300" height="600" />
                                                        </pattern>
                                                    </defs>
                                                    <g key={i} xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth=".60" fill="#FFFFFF" aria-valuetext="test" >
                                                        <path key={i} d={location.path}
                                                            onPointerUp={() => {
                                                                if (isPanMoving === false) {
                                                                    locationModalLogic(locationId);
                                                                    setLocationDetails(location.card_data);
                                                                }
                                                            }}
                                                            fill={`url(#img_pattern_${locationId})`} />
                                                    </g>
                                                </svg>
                                            );
                                        } else {
                                            return (
                                                <svg key={i} ref={svg_ref} strokeWidth='.50'>
                                                    <g key={i} xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth=".60" fill="#FFFFFF" aria-valuetext="test" >
                                                        <path key={i} d={location.path}
                                                            onPointerUp={() => {
                                                                if (isPanMoving === false) {
                                                                    locationModalLogic(locationId);
                                                                    setLocationDetails(location.card_data);
                                                                }
                                                            }}
                                                            fill={location.card_data.name === 'Necunoscut' ? 'green': 'white'} />
                                                    </g>
                                                </svg>
                                            );
                                        }
                                    }
                                })
                                }
                            </svg>
                        </>
                }

            </div>
            {
                <Transition
                    show={locationDetailsIsOpen}
                    enter="transition-opacity duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <LocationDetailsModal
                        key={locationId}
                        locationId={locationId}
                        location_details={locationDetails}
                        visited_locations={visitedLocations}
                        onModalLocationsChanged={onModalLocationsChanged}
                        onHandleChildCloseModal={onHandleChildCloseModal} />
                </Transition>
            }
        </>
    );
};

export default Maps;
