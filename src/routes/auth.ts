import  express  from "express";
import  userController from "../controllers/user";
const router = express.Router();


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login to the application
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Login"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/schemas/User"
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', userController.login);


/**
 * @swagger
 * /api/auth/rehresh:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login to the application
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/RefreshToken"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/schemas/Token"
 *       400:
 *         description: Invalid credentials
 */
router.post('/refresh', userController.refreshToken);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: register to the application
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *           schema:
 *              $ref: "#/components/schemas/User"
 *       400:
 *         description: Invalid credentials
 */
router.post('/register', userController.addUser);

export default router;