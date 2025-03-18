import express from "express";
import commentController from "../controllers/comment";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: comments
 *     description: commnents for a post
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: get comments
 *     description: get all comments. /api/comments?postId=64f5b3c7e4b08c1234567890&count=true
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve comments for.
 *         required: false
 *       - in: query
 *         name: count
 *         schema:
 *           type: boolean
 *         description: If true, returns the count of comments instead of the comments themselves.
 *         required: false
 *    security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: array of comments
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     $ref: "#/components/schemas/comment"
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
 * /api/comments/id:
 *   get:
 *     summary: get comment
 *     description: get one comments. /api/comments/64f5b3c7e4b08c1234567890
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
 *         description: one comment
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/Comment"
 *       400:
 *         description: missing parameters
 *       401:
 *         description: Invalid credentials - invalid token
 *       404:
 *         description: comment not found with the given id
 */
router.get('/:id', commentController.getCommentById);

/**
 * @swagger
 * /api/comments/id:
 *   delete:
 *     summary: delete comment
 *     description: delete one comments. /api/comments/64f5b3c7e4b08c1234567890
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
 *         description: deleted comment
 *       400:
 *         description: Invalid parameter
 *       401:
 *         description: Invalid credentials - invalid token
 *       404:
 *         description: comment not found with the given id
 */
router.delete('/:id', commentController.deleteComment);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: update comment
 *     description: update comment for a post
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: comment was not found
 *       401:
 *         description: Invalid credentials - invalid token
 */
router.put('/:id', commentController.updateComment);

/**
 * @swagger
 * /api/comments:
 *  post:
 *    summary: create comment
 *    description: create comment for a post
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Comment"
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successfully created a comment
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Comment"
 *      400:
 *        description: Invalid parameters
 *      401:
 *        description: Invalid credentials - invalid token
 */
router.post('/', commentController.addComment);

export default router;