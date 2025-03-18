import  express  from "express";
import  userController from "../controllers/user";
import validateToken from "../middleware/validateToken";
import upload from "../middleware/fileUpload";
const router = express.Router();


/**
 * @swagger 
 * /api/users:
 *   get:
 *     tags:
 *       - name: Users
 *     summary: get users 
 *     description: get all users. /api/users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: array of users
 *         content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: "#/components/schemas/user"
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *    summary: get user
 *    description: get one user. /api/users/64f5b3c7e4b08c1234567890
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user to retrieve.
 *    security:
 *      - bearerAuth: []
 * 
 *     responses:
 *       200:
 *         description: one user
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/user"
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Invalid credentials - invalid token
 *       404:
 *         description: user not found with the given id
 */
router.get('/:id', userController.getUserById);

 /**
 * @swagger
 * /api/user/id:
 *   delete:
 *     summary: delete user
 *     description: user one user. /api/user/64f5b3c7e4b08c1234567890
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: deleted user
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Invalid credentials - invalid token
 *       404:
 *         description: user not found with the given id
 */
router.delete('/:id', userController.deleteUser);

/**
 * @swagger
 * /api/posts:
 *  post:
 *    summary: create post
 *    description: create post for a user
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *        schema:
 *          type: object
 *          properties:
 *            post:
 *              $ref: "#/components/schemas/user" 
 *            image:
 *              type: string
 *              format: binary
 *              description: profile picture.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successfully update a user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/user"
 *      400:
 *        description: Invalid parameters
 *      401:
 *        description: Invalid credentials - invalid token
 *      404:
 *        description: user not found with the given id
 */
router.put('/:id', upload.single("image"), userController.updateUser);    


export default router;
