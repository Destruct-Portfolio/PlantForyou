// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, set, ref} from "firebase/database"
import { Plant } from "../types";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2lvz9zTpipO7NEc6JL5YNlXQ6bNeMB7Y",
  authDomain: "mohisafriend.firebaseapp.com",
  projectId: "mohisafriend",
  storageBucket: "mohisafriend.appspot.com",
  messagingSenderId: "1055964958150",
  appId: "1:1055964958150:web:b6999e29c17f329e8476c7",
  databaseUrl:"https://mohisafriend-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const db = getDatabase();

export async function UploadPlant(object:Plant, plantID:string){
    return set(ref(db, 'plants/' + plantID), {
        ...object
      })
      .then((res)=>{
        console.log(res)
        return
      })
      .catch((err)=>{
        throw new err
      });    
}





