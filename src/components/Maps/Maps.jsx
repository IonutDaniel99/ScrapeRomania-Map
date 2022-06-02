import React, { useEffect, useState } from 'react'
import { fetchUserLocation, getUserId } from '../../utils/fetchUserDetails'
import { getLocatios, updateDataToFirebase } from '../../utils/firebaseUtils'

const Maps = () => {
  const [val, setVal] = useState();
  const [locations, setLocations] = useState();
  const uid = getUserId();
  const visited_locations = fetchUserLocation();
  const visited_locations_as_array = Object.keys(visited_locations).map(function (key) { return visited_locations[key] = `${key}` });

  const updateUserLocations = getLocatios().then(data => {
    setLocations(data)
  })

  useEffect(() => {
    updateUserLocations
  }, [val])

  const updateLocations = (locationId) => {
    if (locationId <= 0 || locationId > 100) {
      return;
    }
    const _newLocations = visited_locations;
    if (_newLocations[locationId]) {
      delete _newLocations[locationId];
    }
    else {
      _newLocations[locationId] = locationId;
    }
    return writeData(_newLocations);
  }

  const writeData = (ids) => {
    updateDataToFirebase(
      `users/${uid}`, ids
    )
    localStorage.setItem('visited_locations', JSON.stringify(ids));
  }

  return (
    <>
      <div className='flex flex-wrap max-h-[200px] max-w-[900px] whitespace-normal'>
        { locations && Object.keys(locations).map((x, i) => {
          const locationId = i+1;
          if(visited_locations_as_array.includes((locationId).toString())){
            return (<span onClick={ () => updateLocations(locationId) } key={ locationId } className='flex justify-center items-center w-10 h-10 bg-green-500 rounded-full px-2 text-white cursor-pointer'>{x}</span>)
          } else {
            return (<span onClick={ () => updateLocations(locationId) } key={ locationId } className='flex justify-center items-center w-10 h-10 bg-red-500 rounded-full px-2 text-white cursor-pointer'>{x}</span>)
          }
        })
        }
      </div>
    </>
  )
}

export default Maps