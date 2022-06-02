import { updateDataToFirebase } from "../../utils/firebaseUtils";
import {local_user_id} from "../utils";

export const writeData = (ids) => {
    updateDataToFirebase(
      `users/${local_user_id}`, ids
    )
    localStorage.setItem('visited_locations', JSON.stringify(ids));
}