const {Model, DataTypes} =  require('sequelize')
const {sequelize} = require('../Database/connect')

class User extends Model{}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {type: DataTypes.DATE}
}, {sequelize, modelName: 'User'})

(async()=>{
    return await sequelize.sync({alter: true})
})