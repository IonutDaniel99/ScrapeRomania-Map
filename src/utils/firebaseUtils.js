import { getDatabase, set, update, ref, get, child, onValue } from 'firebase/database'
import { firebaseApp, auth } from '../config/firebase-config'
import Locations from '../data/locationsRomania.json'

export const firebaseDbExport = getDatabase(firebaseApp)
const FIREBASE_ERROR = 'src/utils/firebaseUtils.tsx LIMIT REACH'

export const getUserId = () => {
  var uuid = auth?.currentUser?.uid
  if (uuid === null && window.location.pathname != '/') {
    window.location.href = '/'
  }
  return uuid
}

export const getLocatiosToVisit = () => Promise.resolve(Locations) // Local

export const getUserVisitedLocations = () =>
  onValue(ref(firebaseDbExport, `users/${getUserId()}/visited_locations`), (snapshot) => {
    const values = snapshot.val()
    return Object.keys(values).map((key) => (values[key] = `${key}`))
  })

export const writeDataToFirebase = (path, data) => {
  // console.error(FIREBASE_ERROR, path, data);
  set(ref(firebaseDbExport, `${path}`), data)
}

export const updateDataToFirebase = (path, data) => {
  // console.error(FIREBASE_ERROR, path, data)
  update(ref(firebaseDbExport, `${path}`), { visited_locations: data })
}

// export const getUserVisitedLocations = () => Promise.resolve(coords.users.Wni1bEjH3PRAQJ1FAKOt4uRkB4u2.visited_locations) //LocalFile


export const generateVisitedLocations = () => {
  let localGeneration = {}
  for (var i = 0; i <= 125; i++){
    localGeneration = {...localGeneration, [i]: 0}
  }
  return localGeneration
}