const {Model, Sequelize, DataTypes} = require('sequelize')
const {DBConnect} = require('../Database/connect')
const sequelize = new Sequelize('fatima_school','root', null,{
    host: 'localhost',
    dialect: 'mysql'
})
class Post extends Model{}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false},
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    image:{
        type: DataTypes.STRING,
    }

}, {sequelize, modelNames: 'Post'});


(async()=>{
    
    try {
        await sequelize.sync()
        // await sequelize.sync({alter: true})
    } catch (error) {
            console.log(error)
    }
    
})()
module.exports = Post