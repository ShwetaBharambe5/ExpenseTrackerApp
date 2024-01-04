const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,      
        autoIncrement: true,          
        allowNull: false,             
        primaryKey: true              
    },
    
    amount: Sequelize.INTEGER,      

    description: Sequelize.STRING,      

    category: Sequelize.STRING         
},{
    tableName: 'expenses' // Specify the table name explicitly
});

module.exports = Expense;