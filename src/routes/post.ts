import express from "express";
import postController from "../controllers/post";
import upload from '../middleware/fileUpload';

const router = express.Router();


/**
 * @swagger
 * /api/posts:
 *  get:
 *    tags:
 *      - Posts
 *    summary: get posts
 *    description: get all posts.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: array of posts
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/post"
 *      401:
 *        description: Invalid credentials
 * 
 */
router.get('/', postController.getPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: get post
 *     description: get one post. /api/posts/64f5b3c7e4b08c1234567890
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve.
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: one post
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/post"
 *       400:
 *         description: Invalid parameter 
 *       401:
 *         description: Invalid credentials - invalid token
 *       404:
 *         description: post not found with the given id
 */
router.get('/:id', postController.getPostById);      // /475ry3ere

/**
 * @swagger
 * /api/posts/{id}/like:
 *  post:
 *    tags:
 *      - Posts
 *    summary: add like
 *    description: add like a post
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: The ID of the post to add a like.
 *        required: true
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successfully created a post
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/post"
 *      400:
 *        description: Invalid parameter
 *      401:
 *        description: Invalid credentials - invalid token
 *      404:
 *        description: post not found with the given id
 */
router.post('/:id/like', postController.addLike);
/**
 * @swagger
 * /api/posts/{id}/like:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: delete like
 *     description: delete one like. /api/posts/64f5b3c7e4b08c1234567890
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
 *         description: deleted like
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Invalid credentials - invalid token
 *       404:
 *         description: post not found with the given id
 */
router.delete('/:id/like', postController.removeLike);

 /**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: delete post
 *     description: delete one post. /api/post/64f5b3c7e4b08c1234567890
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: deleted post
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Invalid credentials - invalid token
 *       404:
 *         description: post not found with the given id
 */
router.delete('/:id', postController.deletePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: update post
 *     description: update post for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the post to update.
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               post:
 *                 $ref: "#/components/schemas/image" 
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: post picture.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated image
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/schemas/image"
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: comment was not found
 *       401:
 *         description: Invalid credentials - invalid token
 */
router.put('/:id', upload.single("image"), postController.updatePost);

/**
 * @swagger
 * /api/posts:
 *  post:
 *    tags:
 *      - Posts
 *    summary: create post
 *    description: create post for a user
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              post:
 *                $ref: "#/components/schemas/post" 
 *              image:
 *                type: string
 *                format: binary
 *                description: post picture.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successfully created a post
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/post"
 *      400:
 *        description: Invalid parameters
 *      401:
 *        description: Invalid credentials - invalid token
 */
router.post('/', upload.single("image"), postController.addPost);

export default router;