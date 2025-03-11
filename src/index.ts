import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import userRoute from './routes/user';
import postRoute from './routes/post';
import commentRoute from './routes/comment';
import authRoute from './routes/auth';
import validateToken from './middleware/validateToken';
import path from 'path'


dotenv.config();


const app = express();
const uri = 'mongodb://localhost:27017/rishon_lezion';
mongoose.connect(uri, ).then(() => {}
).catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

const uploadDir = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadDir));
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use('/api/auth', authRoute);
app.use('/api/users', validateToken, userRoute);
app.use('/api/posts', validateToken,postRoute);
app.use('/api/comments',validateToken, commentRoute);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});