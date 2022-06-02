import { child, get, push, ref, set, update } from "firebase/database";
import { getDatabase } from "firebase/database";
import { firebaseApp } from '../config/firebase-config';

const db = getDatabase(firebaseApp);

export const writeDataToFirebase = (path: string, data: Object) => {
  set(ref(db, `${path}`), data);
}

export const updateDataToFirebase = (path: string, data: Object) => {
  update(ref(db, `${path}`), {visited_locations: data});
}

export const getLocationsByUserFromFirebase = (uid: string) => get(child(ref(db), `users/${uid}/visited_locations`)).then(snapshot => {return snapshot.val()})


export const getLocatios = () => get(child(ref(db), `locations/`)).then(snapshot => {return snapshot.val()})