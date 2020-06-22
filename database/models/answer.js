const Sequelize = require('sequelize');
const connection = require('../database');

const AnswerModel = connection.define('answers', {
    idAsk : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

AnswerModel.sync({force: false}).then(()=>{
    console.log('Created Table');
});

module.exports = AnswerModel;