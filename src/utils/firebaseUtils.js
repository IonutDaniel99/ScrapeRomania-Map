import { getDatabase, set, update, ref, get, child, onValue } from 'firebase/database'
import { firebaseApp, auth } from '../config/firebase-config'
import Locations from '../data/locationsRomania.json'

const db = getDatabase(firebaseApp)
const FIREBASE_ERROR = 'src/utils/firebaseUtils.tsx LIMIT REACH'

export const getUserId = () => {
  var uuid = auth?.currentUser?.uid
  if (uuid === null && window.location.pathname != '/') {
    window.location.href = '/'
  }
  return uuid
}

export const getLocatiosToVisit = () => Promise.resolve(Locations) // Local

export const getUserVisitedLocations = () => {
  const id = getUserId()
  var data = {}
  onValue(ref(db, `users/${id}/visited_locations`), (snapshot) => {
    const values = snapshot.val()
    data = Object.keys(values).map(function (key) {
      return (values[key] = `${key}`)
    })
  })
  return data
}

export const writeDataToFirebase = (path, data) => {
  // console.error(FIREBASE_ERROR, path, data);
  set(ref(db, `${path}`), data)
}

export const updateDataToFirebase = (path, data) => {
  // console.error(FIREBASE_ERROR, path, data)
  update(ref(db, `${path}`), { visited_locations: data })
}

// export const getUserVisitedLocations = () => Promise.resolve(coords.users.Wni1bEjH3PRAQJ1FAKOt4uRkB4u2.visited_locations) //LocalFile
