import cloudinary, { ConfigAndUrlOptions, ConfigOptions } from "cloudinary";

class UploadService {
  private cloudinary: ConfigOptions;
  constructor() {
    this.cloudinary = cloudinary.v2;
    this.cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  cloudinaryUploadMethod = async (file: any): Promise<{ res: string }> => {
    return new Promise((resolve) => {
      this.cloudinary.uploader.upload(
        file,
        (
          err: cloudinary.UploadApiErrorResponse | undefined,
          res: cloudinary.UploadApiResponse
        ) => {
          if (err) return res?.status(500).send("upload file error");

          resolve({
            res: res?.secure_url,
          });
        }
      );
    });
  };
}
export default UploadService;
