const express = require("express");
const router = express.Router();
const {Posts , Likes} = require("../models")

const {validateToken} = require('../middlewares/AuthMiddleware');
const { where } = require("sequelize");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({include : [Likes]});
  res.json(listOfPosts)
});

router.post("/",validateToken, async(req, res) => {
  // Handle POST request here
    const post = req.body
    const username = req.user.username
    post.username = username;
    post.UserId = req.user.id
    await Posts.create(post);
    res.json(post);
});

//create a api which will find the post details by its id

router.get('/byId/:id',async(req,res)=>{
  const id = req.params.id
  const post = await Posts.findByPk(id);
  res.json(post)
})

router.get("/byuserid/:id", async(req,res)=>{
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where : {
        UserId:id
    },
    include : [Likes]
  })
  res.json(listOfPosts)
})



router.delete("/:commentId",validateToken,async(req,res)=>{
  const postId = req.params.PostsId;
  
  Posts.destroy({
      where :{
          id:postId,
      },
  });
});
module.exports = router;