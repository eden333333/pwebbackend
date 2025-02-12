import  express  from "express";
import  userController from "../controllers/user";
const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);    
router.post('/', userController.addUser);
router.post('/login', userController.login);

export default router;
