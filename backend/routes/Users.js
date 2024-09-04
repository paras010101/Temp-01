const express = require("express");
const router = express.Router();
const {Users} = require("../models")
const bycrypt = require("bcrypt")
const {sign, TokenExpiredError} = require('jsonwebtoken');
const { validateToken } = require("../middlewares/AuthMiddleware");


router.post("/",(req,res)=>{
    const {username,password} = req.body
    // Users.create({
    //     username:username,
    //     password:password,
    // })
    bycrypt.hash(password,10).then((hash)=>{
        Users.create({
            username:username,
            password:hash,
        })
        res.json("user save sucessfull")
    })
})

router.post("/login",async (req,res)=>{
    const {username,password} = req.body
    const user = await Users.findOne({
        where:{
            username:username
        }
    });
    if(!user){
        res.json({error:"User not exist"});
    }
    // else user exist
    // now compare the passowrd
    else{
        bycrypt.compare(password,user.password).then((match)=>{
            if(!match){
                res.json({error:"username or password is wrong"})
            }
            else{
                const accessToken = sign({
                    username:user.username,
                    id:user.id
                },"importantsecret")
                res.json({token:accessToken,username:username,id:user.id});
        
            }
            
        })
    }
    
    // else{
    //     if(password==user.password){
    //         res.json("username and password matched");
    //     }
    //     else{
    //         res.json("username or password is wrong");
    //     }
    // }
    router.get("/auth",validateToken,(req,res)=>{
        res.json(req.user);
    })
})

module.exports = router;