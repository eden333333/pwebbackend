import  express  from "express";
import  userController from "../controllers/user";
import validateToken from "../middleware/validateToken";
const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);    


export default router;
