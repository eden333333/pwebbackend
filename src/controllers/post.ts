import Post from "../models/post";
import Comment from "../models/comment";
import mongoose from "mongoose";
import { request } from "http";

// פונקציה שמחזירה את כל הפוסטים
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user');
        // TODO add the user who created the post
        if (!posts) return res.json([]);
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching posts", details: error.message });
    }
};

// פונקציה שמחזירה פוסט לפי ID
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('user');
        if (!post) return res.status(404).json({ error: "Post not found" });
        return res.json(post);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching post", details: error.message });
    }
};
const addLike = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        post.likes.push(req.user.id);
        await post.save();
        return res.json(post);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching post", details: error.message });
    }
};
const removeLike = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        post.likes= post.likes.filter(like => like != req.user.id);
        await post.save();
        return res.json(post);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching post", details: error.message });
    }
};
// פונקציה שמוחקת פוסט לפי ID
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.deleteMany({postId:id});
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) return res.status(404).json({ error: "Post not found" });
        return res.json({ message: "Post deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error deleting post", details: error.message });
    }
};

// פונקציה שמעדכנת פוסט לפי ID
const updatePost = async (req, res) => {
    let image;
    try {
        const { id } = req.params;
        const { content, creationDate, user, image } = req.body;
    
        const dataUpdate:{content:string, creationDate:string, user:string, image?:string} = { content, creationDate, user }
        if(req.filename){
            dataUpdate.image = req.filename;
        }
        if(image && image == '-'){
            dataUpdate['$unset'] = {image:''}
        }
        console.log(dataUpdate, image);
        
        const updatedPost = await Post.findByIdAndUpdate(
            { _id: id },
            dataUpdate,
            { new: true }
        );
        if (!updatedPost) return res.status(404).json({ error: "Post not found" });
        return res.json(updatedPost);
    } catch (error) {
        return res.status(500).json({ error: "Error updating post", details: error.message });
    }
};

// פונקציה שמוסיפה פוסט חדש
const addPost = async (req, res) => {
    try {
        const { content, creationDate, user } = req.body;
        const image = req.filename;
        const post = new Post({ content, creationDate, user, image });
        await post.save();
        return res.json(post);
    } catch (error) {
        return res.status(500).json({ error: "Error adding post", details: error.message });
    }
};

export default { getPosts, getPostById, deletePost, updatePost, addPost, addLike, removeLike };
