import  express  from "express";
import  userController from "../controllers/user";
const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *    summary: Login to the application
 *     requestBody:
*          email and password
 *     responses:token and user
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:  
 *    summary: Register to the application
 *    requestBody:
 *         firstName, lastName, birthDate, email, password
 *   responses: 201 ok-created
 */
router.post('/register', userController.addUser);
router.get('/login', (req, res) => {
    res.json({'field':1324})
})

export default router;