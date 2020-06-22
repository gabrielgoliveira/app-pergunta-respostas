const Sequelize = require('sequelize');
const connection = require('../database');

const Asks = connection.define('asks', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Asks.sync({force: false}).then(()=>{
    console.log('Created Table');
});

module.exports = Asks;