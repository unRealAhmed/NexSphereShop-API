const cloudinaryPackage = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

//configure cloudinary
const cloudinary = cloudinaryPackage
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", 'jpeg'],
  params: {
    folder: "NexSphereShop-API",
  },
});

// Init Multer with the storage engine
const upload = multer({ storage });

module.exports = upload;