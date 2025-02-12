import express from "express";
import postController from "../controllers/post";

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.delete('/:id', postController.deletePost);
router.put('/:id', postController.updatePost);
router.post('/', postController.addPost);

export default router;