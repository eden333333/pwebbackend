import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import userRoute from './routes/user';
import postRoute from './routes/post';
import commentRoute from './routes/comment';
import authRoute from './routes/auth';
import validateToken from './middleware/validateToken';
import path from 'path';
dotenv.config();
import {addSwagger} from './middleware/swagger-configuration';




const app = express();

// mongoose.connect(process.env.MONGO_URI, ).then(() => {}
// ).catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

const uploadDir = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadDir));
app.use(express.static(path.join('public', 'dist')))
addSwagger(app);
app.use('/api/auth', authRoute);
app.use('/api/users', validateToken, userRoute);
app.use('/api/posts', validateToken,postRoute);
app.use('/api/comments',validateToken, commentRoute);



// const tmpFunc = async() =>{

// }

// app.listen(process.env.PORT, () => {
//     console.log('Server is running on port ' + process.env.PORT);
// });

export const devAppInit = ()=>{
    app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
}
const initApp = async() => {
    try{
        
        await mongoose.connect(process.env.MONGO_URI, );
        return app;
        
    }catch(err){
        console.log(err);
    }
}

export default initApp;