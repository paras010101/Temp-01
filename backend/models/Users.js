const { Model } = require("sequelize");

module.exports = (sequelize,DataTypes)=>{

    const Users = sequelize.define("Users",{
        username:{
            type:DataTypes.STRING,
            allowNUll:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNUll:false,
        }
    });

    Users.associate = (models) =>{
        Users.hasMany(models.Posts,{
            onDelete:"cascade"
        });
    }
    return Users;
};