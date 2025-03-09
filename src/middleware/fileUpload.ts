import multer from 'multer';
import {v4} from 'uuid';
import path from 'path';
const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, 'uploads/');

     
},
filename: (req, file, cb) => {
    const name = path.extname(file.originalname);
    const fileName = `${v4()}${name}`;
    req.filename = fileName;
cb(null, fileName);
}
});
const upload = multer({ storage: storage });
export default upload;