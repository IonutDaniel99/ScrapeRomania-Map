import { updateDataToFirebase } from "../../utils/firebaseUtils";
import { local_user_id } from "../utils";

const FIREBASE_ERROR = "src/components/LocationDetails/utils.js LIMIT REACH";

export const writeData = (ids) => {
  // console.error(FIREBASE_ERROR);

  updateDataToFirebase(`users/${local_user_id}`, ids);
};
