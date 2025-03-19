import express from "express";
import commentController from "../controllers/comment";

const router = express.Router();

/**
 * @swagger
 * /api/comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get comments
 *     description: Retrieve all comments or count them.
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve comments for.
 *       - in: query
 *         name: count
 *         schema:
 *           type: boolean
 *         description: If true, returns the count of comments instead of the comments themselves.
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of comments
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     $ref: "#/components/schemas/Comment"
 *                 - type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *       401:
 *         description: Invalid credentials
 */
router.get('/', commentController.getComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get a comment
 *     description: Retrieve a single comment by ID.
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
 *         description: A single comment
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/Comment"
 *       400:
 *         description: Missing parameters
 *       401:
 *         description: Invalid credentials - invalid token
 *       404:
 *         description: Comment not found with the given ID
 */
router.get('/:id', commentController.getCommentById);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete a comment
 *     description: Delete a comment by ID.
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted comment
 *       400:
 *         description: Invalid parameter
 *       401:
 *         description: Invalid credentials - invalid token
 *       404:
 *         description: Comment not found with the given ID
 */
router.delete('/:id', commentController.deleteComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Update a comment
 *     description: Update a comment by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Comment"
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated comment
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/schemas/Comment"
 *       400:
 *         description: Invalid parameter
 *       404:
 *         description: Comment was not found
 *       401:
 *         description: Invalid credentials - invalid token
 */
router.put('/:id', commentController.updateComment);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Create a comment
 *     description: Add a comment for a post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: "#/components/schemas/Comment"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully created a comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comment"
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Invalid credentials - invalid token
 */
router.post('/', commentController.addComment);


export default router;