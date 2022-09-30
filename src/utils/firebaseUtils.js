import { getDatabase, set, update, ref, get, child, onValue } from 'firebase/database'
import { firebaseApp } from '../config/firebase-config'
import { getUserId } from './fetchUserDetails'

import Locations from '../data/locationsRomania.json'

const db = getDatabase(firebaseApp)

const FIREBASE_ERROR = 'src/utils/firebaseUtils.tsx LIMIT REACH'

export const writeDataToFirebase = (path, data) => {
  // console.error(FIREBASE_ERROR, path, data);
  set(ref(db, `${path}`), data)
}

export const updateDataToFirebase = (path, data) => {
  // console.error(FIREBASE_ERROR, path, data);
  update(ref(db, `${path}`), { visited_locations: data })
}

export const getLocatiosToVisit = () => Promise.resolve(Locations) // Local

// get(child(ref(db), `users/${uid}/visited_locations`)).then((snapshot) => {
//   return snapshot.val()
// })
// }

// export const getUserVisitedLocations = () => Promise.resolve(coords.users.Wni1bEjH3PRAQJ1FAKOt4uRkB4u2.visited_locations) //LocalFile
