import express from "express";
import commentController from "../controllers/comment";

const router = express.Router();
/**
 * @swagger
 * tags:
 *  - name: comments
 *    description: commnents for a post
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: get comments
 *     description: get all comments. /api/comments?postId=64f5b3c7e4b08c1234567890&count=true
 *     parameters:
 *      - in: query
 *        name: postId
 *        schema:
 *          type: string
 *      - in: query
 *        name: count
 *        schema:
 *          type: string

 *     responses:
 *       200:
 *         description: array of comments
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/comment"
 *       400:
 *         description: Invalid credentials
 *       403:
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
 *      - in: path
 *       name: id
 *       required
 *       schema:
 *         type: string
 *
 *     responses:
 *       200:
 *         description: one comment
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/Comment"
 *       400:
 *         description: Invalid credentials - no token
 *       403:
 *         description: Invalid credentials - invalid token
 *       404:
 *        description: comment not found with the given id
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
 *       name: id
 *       required: true
 *      schema:
 *         type: string
 *
 *     responses:
 *       200:
 *         description: deleted comment
 *       400:
 *         description: Invalid credentials - no token
 *       403:
 *         description: Invalid credentials - invalid token
 *       404:
 *        description: comment not found with the given id
 */
router.delete('/:id', commentController.deleteComment);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: update comment
 *     description:update comment for a post
  *    parameters:
 *      - in: path
 *       name: id
 *      schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Comment"
 *     responses:
 *       200:
 *         description: Successfully updated comment
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/schemas/Comment"
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: comment was not found
 *       403:
 *         description: Invalid credentials - invalid token
 */
router.put('/:id', commentController.updateComment);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: create comment
 *     description:create comment for a post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Comment"
 *     responses:
 *       200:
 *         description: Successfully created a comment
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/schemas/Comment"
 *       400:
 *         description: Invalid credentials
 *       403:
 *         description: Invalid credentials - invalid token
 */
router.post('/', commentController.addComment);

export default router;