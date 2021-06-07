import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const exp = express();
    
export const userList = async (req,res,next) => {
    const usrObj = await User.find({});
    res.send(usrObj);
}

export const saveUser = async (req,res,next) => {
    console.log(req);
    const usrObj =  new User(req.body);
    const result = await usrObj.save(req.body)
    res.send(result);
}

export const viewUser = async (req,res,next) => {
    const usrObj = await User.findById(req.params.id);
    res.send(usrObj);
}

export const editUser = async (req,res,next) => {
    console.log(req);
    const result = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.send(result);
}

export const deleteUser = async (req,res,next) => {
    console.log(req);
    const result = await User.findByIdAndDelete(req.params.id);
    res.send(result);
}

export const userLogin = async (req,res,next) => {
    console.log(req);
     await User.findOne({$or:[{"username":req.body.username},{"email":req.body.username},{"mobile":req.body.username}]}).exec()
     .then(user=>{
        if(!user){
            return res.status(500).send({ succes: false, message: `${req.body.username} does not exist! Please check again`});
        } else {
            if(!req.body.password){
                return res.status(500).send({ succes: false, message: `Please check password`});
            }
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(!result){
                    return res.status(500).send({ succes: false, message: `Password does not mtch! Please check again`});
                } else {
                    const token = jwt.sign({
                        username:user.username,
                        email:user.email,
                        is_admin:user.is_admin,
                        mobile:user.mobile,
                        status:user.status,
                        fname:user.fname,
                        lname:user.lname
                    },
                    'This is dummy text',
                    {
                        expiresIn:"24h"
                    });
                    res.send({username:user.username,email:user.email,mobile:user.mobile,token:token}); 
                }
            })
                 
        }
    }).catch(err=>{
        res.status(500).json({
            err:err
        })
    })
    //res.send(result);
}

export const userSignup = async (req,res,next) => {
    console.log(req);
    await bcrypt.hash(req.body.password,15,(err,hash)=>{
        req.body.password = hash;
        const userObj = new User(req.body);
        const result =  userObj.save((err,Result)=>{
            if(err){
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    const dupField = Object.keys(err.keyValue)[0];
                    return res.status(200).send({ "code": 422, message: `User already exist! Duplicate field(${dupField}). Please use another value(${err.keyValue[dupField]})!`});
                }
            
                // Some other error
                return res.status(422).send(err);
            } else {
                console.log(result);
                res.send({"code":200,"message":"Record inserted successfully","result":Result});
            }
        });
    });
    
    
}

export const usernameCheck = async (req,res,next) => {
    console.log(req);
    try{
        
        const result = await User.findOne({username:req.body.username}).collation( { locale: 'en', strength: 2 } )  ;
        if(result){
            res.send({"code":500,"message":true});
        } else {
            res.send({"code":500,"message":false});
        }
    } catch(err){
        res.status('500').json({error:err})
    }
        
}


export default {userList,saveUser,viewUser,editUser,deleteUser,userLogin,userSignup}; 
