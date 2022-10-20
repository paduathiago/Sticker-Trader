const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('albumcopa', 'root', 'Dec427429!', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;
