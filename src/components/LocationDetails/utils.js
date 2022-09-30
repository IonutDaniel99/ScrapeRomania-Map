import { getUserId } from '../../utils/fetchUserDetails'
import { updateDataToFirebase } from '../../utils/firebaseUtils'

const FIREBASE_ERROR = 'src/components/LocationDetails/utils.js LIMIT REACH'

export const writeData = (ids) => {
  // console.error(FIREBASE_ERROR);
  const userUUID = getUserId()
  updateDataToFirebase(`users/${userUUID}`, ids)
}
