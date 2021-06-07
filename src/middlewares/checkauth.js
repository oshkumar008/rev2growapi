import jwt from 'jsonwebtoken';
const auth = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token,'This is dummy text');
        next();
    } catch(err)
    {
        return res.status(500).json({
            Error:err
        })
    }
    
}
export default auth;