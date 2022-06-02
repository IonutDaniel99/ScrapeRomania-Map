import React from 'react'
import {writeData} from './utils';

const LocationDetails = ({ locationId, visited_locations }) => {
  const updateLocations = (locationId) => {
    console.log(locationId)
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

  return (
    <>
      <button className='absolute top-20 left-10 h-4/5 w-96 bg-teal-500' onClick={() => updateLocations(locationId)}>{locationId}</button>
    </>
  )
}

export default LocationDetails
