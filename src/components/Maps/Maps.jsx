import React, { useEffect, useState } from 'react'
import { fetchUserLocation } from '../../utils/fetchUserDetails'
import { getLocatios } from '../../utils/firebaseUtils'
import LocationDetails from '../LocationDetails/LocationDetails'

const Maps = () => {
  const [val, setVal] = useState();
  const [locations, setLocations] = useState();
  const [locationId, setLocationId] = useState(0);
  const [lastLocationId, setLastLocationId] = useState(0);
  const [locationDetailsIsOpen, setLocationDetailsIsOpen] = useState(false);

  const visited_locations = fetchUserLocation();
  const visited_locations_as_array = Object.keys(visited_locations).map(function (key) { return visited_locations[key] = `${key}` });

  const updateUserLocations = getLocatios().then(data => {
    setLocations(data)
  })

  useEffect(() => {
    updateUserLocations
  }, [val])


  const locationModalLogic = (index) => {

    if (index !== lastLocationId) {
      setLocationDetailsIsOpen(true);
      setLastLocationId(index)
      setLocationId(index)
    } else {
        if (index === lastLocationId) {
          setLocationDetailsIsOpen(false);
          setLastLocationId(0)
        } else {
          setLocationDetailsIsOpen(true);
        }
    }

  }

  return (
    <>
      <div className='flex flex-wrap max-h-[200px] max-w-[900px] whitespace-normal'>
        {locations && Object.keys(locations).map((x, i) => {
          const locationId = i + 1;
          if (visited_locations_as_array.includes((locationId).toString())) {
            return (<span onClick={() => {
              locationModalLogic(locationId)
            }} key={locationId} className='flex justify-center items-center w-10 h-10 bg-blue-500 rounded-full px-2 text-white cursor-pointer'>{x}</span>)
          } else {
            return (<span onClick={() => {
              locationModalLogic(locationId)
            }} key={locationId} className='flex justify-center items-center w-10 h-10 bg-red-500 rounded-full px-2 text-white cursor-pointer'>{x}</span>)
          }
        })
        }
      </div>
      {locationDetailsIsOpen && <LocationDetails locationId={locationId} visited_locations={visited_locations} />}
    </>
  )
}

export default Maps