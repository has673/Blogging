const express = require('express');

const cors = require('cors');
const{connectDB} = require('./config/db');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const authRouter = require('./Routes/Auth');
const adminRouter = require('./Routes/Admin');
const userRouter = require('./Routes/User');
const blogRouter = require('./Routes/Blog');
require('dotenv').config();
connectDB()
app.listen(port, () => {
          console.log(`Server is running on port: ${port}`);
        });
      

app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cookieParser())
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);