const {Sequelize} = require('sequelize')
require('dotenv').config()
// const User = require('../models/User');
// const sequelize = new Sequelize('fatima_school','root', null,{
//     host: 'localhost',
//     dialect: 'mysql'
// })

const sequelize = new Sequelize('fatima_development','root', null,{
    host: 'localhost',
    dialect: 'mysql'
})

async function DBConnect(){
   

    try {
        await sequelize.authenticate()
        console.log('database connected')

    } catch (error) {
        console.error('unable to connect to database', error)
    }
}

module.exports = {
    sequelize,
     DBConnect
}