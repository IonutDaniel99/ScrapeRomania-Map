import React, { useEffect, useState } from 'react'
import { writeData } from './utils';

const LocationDetails = ({ locationId, location_details, visited_locations, onModalLocationsChanged }) => {
  const [check, setCheck] = useState(true);

  useEffect(()=>{
    isChecked()
  },[])

  const isChecked = () => {
    if(visited_locations.includes(locationId.toString())){
      setCheck(false);
    }else{
      setCheck(true)
    }
  }

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
    onModalLocationsChanged(_newLocations)
    writeData(_newLocations);
  }

  return (
    <>
      <div className='absolute top-20 left-10 h-4/5 w-96 bg-teal-500'>
        {
          Object.entries(location_details).map(([key, value]) => (
            <div key={key}>{key}:{value}</div>
          ))
        }
        <button
          className='w-20 h-20 bg-red-400'
          onClick={() => {
            updateLocations(locationId);
            isChecked();
          }}
        >
          {check ? "Check" : "Uncheck"} {locationId}
        </button>
      </div>
    </>
  )
}

export default LocationDetails
