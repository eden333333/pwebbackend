import express from "express";
import commentController from "../controllers/comment";

const router = express.Router();

router.get('/', commentController.getComments);
router.get('/:id', commentController.getCommentById);
router.delete('/:id', commentController.deleteComment);
router.put('/:id', commentController.updateComment);
router.post('/', commentController.addComment);

export default router;