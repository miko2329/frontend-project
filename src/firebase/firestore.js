import {getFirestore} from "firebase/firestore";
import app from "./firebase.js";

const dataBase = getFirestore(app);

export default dataBase