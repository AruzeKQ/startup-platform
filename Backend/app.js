const cors = require('cors')

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const taskRouter = require('./routes/taskRoutes');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Chỉ định rõ chỉ cho phép Frontend của bạn gọi vào
    credentials: true,             // Cho phép gửi kèm cookie/token nếu có
}));

app.use(express.json());

//auth router
app.use('/api/auth', authRouter);
//user router
app.use('/api/users', userRouter);
//projects router
app.use('/api/projects', projectRouter);
//tasks router
//app.use('/api/tasks', taskRouter);
//chat router

//documents router

//reviews router

//connect to mongodb local 
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log('error when connecting to mongodb', err));



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});