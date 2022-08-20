import express from'express';
import auth from '../Middleware/auth.js';
import {getPosts , createPost ,updatePost ,deletePost ,likePost} from '../Controllers/post.js'

const router = express.Router();


router.get('/',getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);


export default router;