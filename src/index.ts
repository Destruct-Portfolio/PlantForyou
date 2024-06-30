import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import axios from "axios";
import formatUrl from "./providers/formatUrl.js";
import fs from "node:fs";
import DownloadImage from "./providers/downloadimage.js";
import CloudinaryUpload from "./providers/cloudinary.js";
import { UploadPlant, firebaseConfig } from "./providers/firebase.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getDatabase();

/**
 * @param plants number of plants you would like to scraper
 * @param startAt Your starting point
 * this way you can give a range to start and stop the script.
 */

const Plants = 5;
const startAt = 11;

const scrapePlants = async (plants: number, startAt: number) => {
  for (let i = startAt; i < startAt + plants; i++) {
    try {
      const response = await axios.get(
        `https://api-gateway.prod.rightplants4me.co.uk/api/plants/${i}`
      );
      const data = response.data;

      if (!data || data.length === 0) {
        console.log(`No data found for plant with ID ${i}`);
        continue;
      }

      const plantData = data[0];
      const photos = plantData.photos || [];

      // Create the directory synchronously
      fs.mkdirSync(`./${plantData.PlantID}`, { recursive: true });

      const uploadedPics = [];
      for (let index = 0; index < photos.length; index++) {
        const element = photos[index];
        const url = await formatUrl(element.Name);
        console.log(`Formatted URL is ===> ${url}`);
        const filePath = `./${plantData.PlantID}/${index}.jpg`;
        await DownloadImage(url, filePath);

        const uploadUrl = await CloudinaryUpload(filePath);
        uploadedPics.push(uploadUrl);
      }

      // Combine cloudinary URLs with JSON object
      plantData.photos = uploadedPics;
      console.log(uploadedPics);

      // Save to Firebase
      await UploadPlant(database, plantData, `${plantData.PlantID}`);

      // Remove the directory synchronously
      fs.rmSync(`${plantData.PlantID}`, { recursive: true, force: true });
    } catch (error:any) {
      console.error(`Error processing plant with ID ${i}: ${error.message}`);
      console.error(error);
    }
  }
};


await scrapePlants(Plants, startAt)

process.exit(0)

