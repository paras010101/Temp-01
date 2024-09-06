const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { where } = require("sequelize");



router.post("/",validateToken,async (req,res) => {
    const {PostId} = req.body;
    const UserId = req.user.id;
    const found = await Likes.findAll({
        where :{
            PostId : PostId,
            UserId : UserId
        }
    })
    if(found.length === 0){
        await Likes.create({PostId : PostId , UserId : UserId}).then((response)=>{
            res.json({liked : true})
        })
    }
    else{
        Likes.destroy({
            where :{
                PostId : PostId,
                UserId : UserId
            },
        });
        res.json({liked : false})
    }

})
module.exports = router;