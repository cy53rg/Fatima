const {sequelize} = require('../Database/connect')
const {Model, DataTypes} = require('sequelize')

class Banner extends Model{}

Banner.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
}, {sequelize, modelName: 'Banner'});

(async()=>{
    try {
        // await sequelize.sync({alter: true})
        await sequelize.sync()
    } catch (error) {
        console.log(error)
    }
})()

module.exports = Banner;