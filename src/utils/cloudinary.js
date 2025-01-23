import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});


const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload file on cloudinary server
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"

        })
        // file has been uploaded successfully
        //console.log("File uploaded successfully ", response.url);
        fs.unlinkSync(localFilePath)
        return response;
        
    } catch (error) {
        fs.unlink(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    }
}


export { uploadCloudinary }


// cloudinary.v2.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag", tags: "sample_tag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
