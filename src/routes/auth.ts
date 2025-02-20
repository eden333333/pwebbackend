import  express  from "express";
import  userController from "../controllers/user";
const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.addUser);
router.get('/login', (req, res) => {
    res.json({'field':1324})
})

export default router;