const {Model, DataTypes} = require('sequelize')
const {sequelize} = require('../Database/connect')

class Teacher extends Model{}
Teacher.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
}, {sequelize, modelName: 'Teacher'});

(async()=>{
    try {
        await sequelize.sync()
        // await sequelize.sync({alter: true})
    } catch (error) {
            console.log(error)
    }
})()

module.exports =Teacher