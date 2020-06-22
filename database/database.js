const Sequelize = require('sequelize');

const connection = new Sequelize('appaskanswer', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;