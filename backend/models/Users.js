const { Model } = require("sequelize");

module.exports = (sequelize,DataTypes)=>{

    // const Users = sequelize.define("Users",{
    //     username:{
    //         type:DataTypes.STRING,
    //         allowNUll:false,
    //     },
    //     password:{
    //         type:DataTypes.STRING,
    //         allowNUll:false,
    //     }
    // });
    const Users = sequelize.define("Users", {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,  // Ensure username is unique
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
      

    Users.associate = (models) =>{
        Users.hasMany(models.Likes,{
            onDelete:"cascade"
        });
        Users.hasMany(models.Posts,{
            onDelete:"cascade"
        })
    }
    return Users;
};

