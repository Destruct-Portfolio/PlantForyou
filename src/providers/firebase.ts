// Import the functions you need from the SDKs you need
import { set, ref, Database} from "firebase/database"
import { Plant } from "../types";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  databaseUrl:""
};



export async function UploadPlant(db:Database,object:Plant, plantID:string){
  return set(ref(db, 'plants/' + plantID), {
        ...object
      })
      .then((res)=>{
        console.log('Saved Plant in Database with id , ', object.PlantID)
        return
      })
      .catch((err)=>{
        throw new err
      });    
}





