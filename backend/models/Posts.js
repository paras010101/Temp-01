const { Model } = require("sequelize");

module.exports = (sequelize,DataTypes)=>{

    const Posts = sequelize.define("Posts",{
        title:{
            type:DataTypes.STRING,
            allowNUll:false,
        },
        posttext:{
            type:DataTypes.STRING,
            allowNUll:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNUll:false,
        },
    });

    Posts.associate = (models) =>{
        Posts.hasMany(models.Comments,{
            onDelete:"cascade"
        });
        Posts.hasMany(models.Likes,{
            onDelete:"cascade"
        });
    }
    return Posts;
};