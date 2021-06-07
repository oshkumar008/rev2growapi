'use strict'
import cors from 'cors';
import express, { json } from  'express';
import mongoose from 'mongoose';
//import routs from './routes/mainRouts';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
console.log(this);
const exp = express();
exp.use(express.urlencoded({extended:true}));
exp.use(express.json());
exp.use(cors());
//Mongodb connection
mongoose.connect('mongodb://localhost:27017/rev2grow', { useNewUrlParser: true });
const checkmongocont = mongoose.connection;
checkmongocont.on('error', err => {
    console.log(err);
});
checkmongocont.on('open',()=>{
    console.log('connected');
})

exp.use('/users',userRouter);
exp.use('/products',productRouter);
exp.use(function(req, res, next) {
    if(!res){
        
    }
    res.status(404).send({
        status: 404,
        error: "Not found"
    });      
});
exp.listen(2000,() => {
    console.log('Welcome my new world of growth');   
})
//console.log(module.__name)
