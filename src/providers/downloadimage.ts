import axios from "axios";
import fs from "node:fs";

export default async function DownloadImage(url: string, filePath: string) {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      let error: any = null;
      writer.on("error", (err: any) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on("close", () => {
        if (!error) {
          resolve(true);
        }
      });
    });
    
  } catch (error) {
    console.error(`Error downloading the image: ${error}`);
    throw error;
  }
}