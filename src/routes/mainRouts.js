//import express from express; 
const exp = express();
import userRouter from '../routes/userRouter.js';
function routes(){
    exp.use('/books',userRouter);
}

exports = routes;