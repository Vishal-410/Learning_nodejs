import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';


 // Configuration
 cloudinary.config({ 
  cloud_name: 'dscsbixa2', 
  api_key: '395229328523777', 
  api_secret: process.env.ClOUDINARY_API_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});
export const uploadResult = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
 const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Remove local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response; // This is what you need

  } catch (error) {
    // Remove local file even if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    console.error("Upload failed:", error);
    throw error;
  }
};
