import mongoose from "mongoose"; 

const commentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true // id ייווצר אוטומטית
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // קישור למודל הפוסט
        required: true
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // תאריך יצירת התגובה
    },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // קישור למודל המשתמש
            required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
