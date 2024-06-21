import axios from "axios";
import formatUrl from "./providers/formatUrl.js";
import fs from "node:fs";
import DownloadImage from "./providers/downloadimage.js";
import CloudinaryUpload from "./providers/cloudinary.js";
import { UploadPlant } from "./providers/firebase.js";
import { error } from "node:console";

/**
 * @param plants number of plants you would like to scraper
 * @param startAt Your starting point
 * this way you can give a range to start and stop the script.
 */

const Plants = 1;
const startAt = 8;

for (var i = startAt; i <= startAt + Plants; i++) {
  try {
     await axios
      .get(`https://api-gateway.prod.rightplants4me.co.uk/api/plants/${i}`)
      .then(async (response) => {
        const data = response.data;

        // this needs to be more polished
        let plantData = data[0];
    
        let photos = data[0].photos;
    
        // Create the directory synchronously
        fs.mkdirSync(`./${plantData.PlantID}`, { recursive: true });
    
        const uploaded_pics: Array<string> = [];
        for (let index = 0; index <= photos.length; index++) {
          const element = photos[index];
          const url = await formatUrl(element.Name);
          console.log(`Formated url is ===> ${url}`);
          await DownloadImage(url, `./${plantData.PlantID}/${index}.jpg`);
          // download the picture to cloudinary here
          let uploadUrl = await CloudinaryUpload(
            `./${plantData.PlantID}/${index}.jpg`
          );
          uploaded_pics.push(uploadUrl);
        }
    
        // combining cloudinary and json object
        plantData.photos = uploaded_pics;
        //Object.assign(plantData )
        console.log(uploaded_pics)
        plantData["photos"] = uploaded_pics;
        // test save to see
    
        await UploadPlant(plantData, `${plantData.PlantID}`);
        //fs.writeFileSync(`${plantData.PlantID}_${i+1}.json`, JSON.stringify(plantData));
        // save to firebase here
        // delete the folder here
        fs.rmSync(`${plantData.PlantID}`, { recursive: true, force: true });
      })
      .catch((err) => {
        console.log(err);
      });
  
  } catch (error) {
    // this needs to identify the error and log it out...
    console.log(`Plant with ID ${i} does not exist ... `);
    console.log(error);
  }
}
