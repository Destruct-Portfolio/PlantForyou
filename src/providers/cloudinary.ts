import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import ConfigService from "./configService.js";

const config = new ConfigService();

// Configuration
cloudinary.config({
  cloud_name: config.get("CLOUD_NAME"),
  api_key: config.get("API_KEY"),
  api_secret: config.get("API_SECRET"),
});

export default async function CloudinaryUpload(path: string) {
  // Upload an image
  return await cloudinary.uploader
    .upload(path, {
      folder: config.get("FOLDER_NAME"),
      unique_filename: true,
    })
    .then((Response:UploadApiResponse) => {
      return Response.url;
    })
    .catch((error:UploadApiErrorResponse) => {
      console.log(error);
      throw error
    });
}
