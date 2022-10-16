import { firebaseDbExport, getUserId, updateDataToFirebase } from '../../utils/firebaseUtils'
import { getDatabase, set, update, ref, get, child, onValue} from 'firebase/database'

const FIREBASE_ERROR = 'src/components/LocationDetails/utils.js LIMIT REACH'

export const writeData = (ids) => {
  const userUUID = getUserId()
  update(ref(firebaseDbExport, `users/${userUUID}/visited_locations`), {...ids})
}
