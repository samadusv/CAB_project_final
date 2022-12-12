const {Sequelize,DataTypes} = require('sequelize');

const sequelize = new Sequelize("cabproject","root","Nasa@432000",

{

    host: "localhost",

    dialect:"mysql"
});

module.exports.sequelize = sequelize;