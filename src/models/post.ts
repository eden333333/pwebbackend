import mongoose from "mongoose"; 

const postSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true // ייווצר אוטומטית
    },
    content: {
        type: String,
        required: true
    },
    creationDate: {
        type: String,
        required: true // תאריך יצירת הפוסט
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // קישור למודל המשתמש
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // קישור למודל המשתמש
        

    


    }]
});

const Post = mongoose.model('Post', postSchema);
export default Post;
