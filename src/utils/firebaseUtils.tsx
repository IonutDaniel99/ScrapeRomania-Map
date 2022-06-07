import { child, get, push, ref, set, update } from "firebase/database";
import { getDatabase } from "firebase/database";
import { firebaseApp } from '../config/firebase-config';
import { getUserId } from "./fetchUserDetails";

const db = getDatabase(firebaseApp);
const uid = getUserId();

export const writeDataToFirebase = (path: string, data: Object) => {
  set(ref(db, `${path}`), data);
}

export const updateDataToFirebase = (path: string, data: Object) => {
  update(ref(db, `${path}`), {visited_locations: data});
}

export const getLocatiosToVisit = () => get(child(ref(db), `locations/`)).then(snapshot => {return snapshot.val()})
export const getUserVisitedLocations = () => get(child(ref(db), `users/${uid}/visited_locations`)).then(snapshot => {return snapshot.val()})