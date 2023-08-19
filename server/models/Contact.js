const {sequelize,} = require('../Database/connect')
const { Model, DataTypes} = require('sequelize')


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