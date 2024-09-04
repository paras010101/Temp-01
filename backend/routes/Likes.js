const express = require("express");
const router = express.Router();
const {Likes} = require("../models/Likes");
const {validatetToken } = require("../middlewares/AuthMiddleware")



router.post("/",validatetToken,async (req,res) => {
    const {PostId} = req.body;
    const UserId = req.user.id;
    await Likes.create({PostId : PostId , UserId : UserId}).then((response)=>{
        res.json("sucess")
    })

})
module.exports = router;