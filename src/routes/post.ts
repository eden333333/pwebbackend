import express from "express";
import postController from "../controllers/post";
import upload from '../middleware/fileUpload';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);      // /475ry3ere
router.post('/:id/like', postController.addLike);
router.delete('/:id/like', postController.removeLike);
router.delete('/:id', postController.deletePost);       
router.put('/:id', upload.single("image"), postController.updatePost);
router.post('/', upload.single("image"), postController.addPost);

export default router;