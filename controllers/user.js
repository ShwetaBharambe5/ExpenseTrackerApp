const Expense = require('../models/user');

const userRoute = require('../routes/user');

const path = require('path');

exports.getExpenseForm = async(req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

exports.addExpense = async(req, res, next) => {
    try{
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        const data = await Expense.create({amount:amount, description:description, category:category});

        res.status(201).json({newExpenseDetails:data});
    }catch(err){
        res.status(500).json({error:err});
    }
}

exports.deleteExpense = async(req, res, next) => {
    try{
        const expenseId = req.params.id;

        const expense = await Expense.findByPk(expenseId);

        if(!expense){
            return res.status(404).json({error: 'Expense not found!'});
        }

        await expense.destroy();
        res.status(200).json({message: 'Expense deleted successfully'});
    }
    catch(err){
        console.err('Error deleting expense:', err);
        res.status(500).json({error: err});
    }
};

exports.getExpense = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll();
        console.log('All Expenses:', expenses); 
        res.json(expenses);
    } catch (err) {
        console.error('Error fetching expenses:', err);
        res.status(500).json({error: err});
    }
}
