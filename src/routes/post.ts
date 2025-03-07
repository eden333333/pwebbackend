import express from "express";
import postController from "../controllers/post";

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);      // /475ry3ere
router.post('/:id/like', postController.addLike);
router.delete('/:id/like', postController.removeLike);
router.delete('/:id', postController.deletePost);       
router.put('/:id', postController.updatePost);
router.post('/', postController.addPost);

export default router;