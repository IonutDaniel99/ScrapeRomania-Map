import { auth } from '../config/firebase-config'

export const getUserId = () => {
  var uuid = auth?.currentUser?.uid
  if (uuid === null && window.location.pathname != '/') {
    window.location.href = '/'
  }
  return uuid
}
