require('dotenv').config();
const express =require('express');
const DBconnection = require('./DB/connection');
const path=require('path');
var QRCode = require('qrcode');
const app= express();
var cors=require('cors');
app.use(cors());
const {authRouter,postRouter,userRouter}=require('./modules/index.router');
app.use(express.json());
app.use('/uploads',express.static(path.join(__dirname,'./uploads')));
app.use('/api/v1/user',userRouter);
app.use('/api/v1/post',postRouter);
app.use('/api/v1/auth',authRouter);
DBconnection();

const port=process.env.PORT;
app.listen(port,()=>{console.log(`server is running......${port}`);});