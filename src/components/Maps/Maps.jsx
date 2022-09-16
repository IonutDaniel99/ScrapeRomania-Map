import React, { useEffect, useReducer, useRef, useState } from 'react'
import LocationDetailsModal from '../LocationDetails/LocationDetailsModal'
import { getLocatiosToVisit, getUserVisitedLocations } from '../../utils/firebaseUtils'
import { Transition } from '@tailwindui/react'
import ReactLoading from 'react-loading'

import coords from '../../data/locationsRomania.json'
import panzoom from 'panzoom'
import SvgDisplay from './SvgDisplay'

const Maps = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const [locationsList, setLocationsList] = useState(coords)
  const [visitedLocations, setVisitedLocations] = useState()
  const [isLoading, setIsLoading] = useState(true)
  // Modal Logic
  const [locationId, setLocationId] = useState(0)
  const [lastLocationId, setLastLocationId] = useState(0)
  const [locationDetails, setLocationDetails] = useState()
  const [locationDetailsIsOpen, setLocationDetailsIsOpen] = useState(false)

  const locationsNumberRef = useRef(null)
  const [displayPanZoomDisplayNumbers, setDisplayPanZoomDisplayNumbers] = useState(false)
  const [isPanMoving, setIsPanMoving] = useState(false)

  useEffect(() => {
    const a = fetchLocationToVisit()
    const b = fetchUserVisitedLocations()
    Promise.all([a, b])
      .then((values) => {
        setLocationsList(values[0])
        setVisitedLocations(
          Object.keys(values[1]).map(function (key) {
            return (values[1][key] = `${key}`)
          })
        )
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      })
  }, [])

  const fetchLocationToVisit = () =>
    getLocatiosToVisit().then((locationsToVisit) => {
      return locationsToVisit
    })
  const fetchUserVisitedLocations = () =>
    getUserVisitedLocations().then((userVisitedLocations) => {
      return userVisitedLocations
    })

  const onModalLocationsChanged = (newLocations) => {
    setVisitedLocations(newLocations)
    forceUpdate()
  }

  const locationModalLogic = (index) => {
    if (index !== lastLocationId) {
      setLocationDetailsIsOpen(true)
      setLastLocationId(index)
      setLocationId(index)
    } else {
      if (index === lastLocationId) {
        setLocationDetailsIsOpen(false)
        setLastLocationId(0)
      } else {
        setLocationDetailsIsOpen(true)
      }
    }
  }

  const onHandleChildCloseModal = () => {
    setLocationDetailsIsOpen(false)
  }

  const gPanZoomRef = useRef(null)
  useEffect(() => {
    if (gPanZoomRef.current == null) return
    const instance = panzoom(gPanZoomRef.current, {
      transformOrigin: { x: 0.5, y: 0.5 },
      maxZoom: 6,
      minZoom: 1,
      smoothScroll: true,
      zoomSpeed: 0.5,
      initialX: 0,
      initialY: 0,
      bounds: {
        left: 800, //700 - 500 - 400 - 200
        right: 400,
        top: 600,
        bottom: 200,
      },
      boundsPadding: 0.6,
      onTouch: function () {
        return false // tells the library to not preventDefault.
      },
      onDoubleClick: function () {
        return false // tells the library to not preventDefault, and not stop propagation
      },
      beforeMouseDown: function (e) {
        return !e.altKey
      },
    })
    instance.on('pan', () => {
      setIsPanMoving(true)
    })
    instance.on('panend', () => {
      setIsPanMoving(false)
    })
    instance.on('zoom', (e) => {
      if (e.getTransform().scale > 1.75) {
        setDisplayPanZoomDisplayNumbers(true)
      } else {
        setDisplayPanZoomDisplayNumbers(false)
      }
    })

    return () => {}
  }, [])

  const svg_ref = useRef(null)

  return (
    <>
      {isLoading && (
        <div className={'absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center'}>
          <ReactLoading type={'bubbles'} color={'black'} height={300} width={150} />
        </div>
      )}
      <div className='relative' ref={gPanZoomRef}>
        {!isLoading && (
          <>
            <div id='locations_numbers' ref={locationsNumberRef} className={'z-50'}>
              {Object.values(locationsList).map((location, i) => {
                if (svg_ref.current != null) {
                  return (
                    <div
                      key={`key_location_svg_${i}`}
                      id={`location_svg_${i}`}
                      className={'absolute top-0 left-0 text-[6px] ml-1 mt-[10px] font-semibold'}
                      style={{
                        transform: `translate(${location.number_coords[0]}px,${location.number_coords[1]}px)`,
                        visibility: displayPanZoomDisplayNumbers ? 'visible' : 'hidden',
                      }}
                    >
                      {location.number}
                    </div>
                  )
                }
              })}
            </div>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' baseProfile='tiny' width={1200} height={800}>
              {Object.values(locationsList).map((location, i) => {
                const locationId = i + 1
                const imageFill = visitedLocations.includes(locationId.toString())
                return (
                  <SvgDisplay
                    svg_ref={svg_ref}
                    imageFill={imageFill}
                    isPanMoving={isPanMoving}
                    key={locationId}
                    location={location}
                    locationId={locationId}
                    locationModalLogic={(id) => locationModalLogic(id)}
                    setLocationDetails={(location) => setLocationDetails(location)}
                  />
                )
              })}
            </svg>
          </>
        )}
      </div>
      {
        <Transition
          show={locationDetailsIsOpen}
          enter='transition-opacity duration-1000'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-1000'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <LocationDetailsModal
            key={locationId}
            locationId={locationId}
            location_details={locationDetails}
            visited_locations={visitedLocations}
            onModalLocationsChanged={onModalLocationsChanged}
            onHandleChildCloseModal={onHandleChildCloseModal}
          />
        </Transition>
      }
    </>
  )
}

export default Maps
