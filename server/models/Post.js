const {Model, DataTypes} = require('sequelize')
const {sequelize} = require('../Database/connect')

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
    details: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {sequelize, modelNames: 'Post'})

async()=>{
    const post =await Post.create({
        title: "how to become bad",
        details: "jiberish is also good"
    })
    console.log(post)
    return await sequelize.sync({alter: true})
    
}
