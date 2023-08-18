// const {sequelize, DBConnect} = require('../Database/connect')
const {Sequelize, Model, DataTypes} = require('sequelize')

const sequelize = new Sequelize('fatima_school','root', null,{
    host: 'localhost',
    dialect: 'mysql'
})

class Contact extends Model{}

Contact.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    names: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,

    },
}, {sequelize, modelName: 'Contact'});

(async()=>{
    try {
        await sequelize.sync()
        // await sequelize.sync({alter: true})
    } catch (error) {
            console.log(error)
    }
})()
module.exports = Contact