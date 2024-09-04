module.exports = (sequelize,DataTypes)=>{

    const Comments = sequelize.define("Comments",{
        commentsBody:{
            type:DataTypes.STRING,
            allowNUll:false,
        },
        username : {
            type:DataTypes.STRING,
            allowNUll:false
        }
    });
    return Comments;
};