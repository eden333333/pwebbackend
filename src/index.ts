import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoute from './routes/user';





const app = express();
const uri = 'mongodb://localhost:27017/rishon_lezion';
mongoose.connect(uri, ).then(() => {}
).catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use('/api/users', userRoute);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});