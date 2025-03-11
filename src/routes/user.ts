import  express  from "express";
import  userController from "../controllers/user";
import validateToken from "../middleware/validateToken";
import upload from "../middleware/fileUpload";
const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', upload.single("image"), userController.updateUser);    


export default router;
