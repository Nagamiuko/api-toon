import multer from 'multer'
const multerConfig = multer.diskStorage({
   destination: (req, res, callback) => {
     callback(null,'public/coverimage');
   },
   filename: (req, file, callback) => {
     const ext = file.mimetype.split("/")[1];
     callback(null, `image-${Date.now()}.${ext}`);
   },
 });
 const isImage = (req, file, callback) => {
   if (file.mimetype.startsWith("image")) {
     callback(null, true);
   } else {
     callback(new Error("Only Image is Allowed.."));
   }
 };
const upload = multer({
   storage: multerConfig,
   fileFilter: isImage,
});

export default upload

