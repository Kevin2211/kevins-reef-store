import express from 'express'
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier'
import multer from 'multer'
import { isAdmin, isAuth } from '../utils.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Kevins-reef-store',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
    
})

const uploadRouter = express.Router()
const upload = multer(storage)


uploadRouter.post('/',  isAuth,isAdmin , upload.single('file') , async (req,res) => {
    
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    })
    const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
      const result = await streamUpload(req);
      res.send(result);

})

export default uploadRouter