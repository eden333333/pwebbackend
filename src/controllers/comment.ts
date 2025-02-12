import Comment from "../models/comment";

// פונקציה שמחזירה את כל התגובות
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.json(comments);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching comments", details: error.message });
    }
};

// פונקציה שמחזירה תגובה לפי ID
const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) return res.json([]);
        return res.json(comment);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching comment", details: error.message });
    }
};

// פונקציה שמוחקת תגובה לפי ID
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) return res.status(404).json({ error: "Comment not found" });
        return res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error deleting comment", details: error.message });
    }
};       


// פונקציה שמעדכנת תגובה לפי ID
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { postId, name, comment, createdAt, user } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            { _id: id },
            { postId, name, comment, createdAt, user },
            { new: true }
        );
        if (!updatedComment) return res.status(404).json({ error: "Comment not found" });
        return res.json(updatedComment);
    } catch (error) {
        return res.status(500).json({ error: "Error updating comment", details: error.message });
    }
};

// פונקציה שמוסיפה תגובה חדשה
const addComment = async (req, res) => {
    try {
        const { postId, name, comment, createdAt, user } = req.body;
        const newComment = new Comment({ postId, name, comment, createdAt, user });
        await newComment.save();
        return res.json(newComment);
    } catch (error) {
        return res.status(500).json({ error: "Error adding comment", details: error.message });
    }
};

export default { getComments, getCommentById, deleteComment, updateComment, addComment };
