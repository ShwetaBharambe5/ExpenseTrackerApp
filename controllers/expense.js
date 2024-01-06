const Expense = require('../models/expense');

const userRoute = require('../routes/expense');

const path = require('path');

// exports.getExpenseForm = async(req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
// }

exports.addExpense = async(req, res, next) => {
    try{
        console.log('Test---');
        console.log(req.user.id);
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
console.log(amount,description,category,req.user.id,'------------->')
        const data = await Expense.create({amount:amount, description:description, category:category, userId: req.user.id});

        console.log(data);

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

        const numOfrows = await Expense.destroy({where:{id:expenseId, userId:req.user.id}});
        
         if(numOfrows === 0){
            return res.status(404).json({success:false, message:'Expense does not belong to the user'});
        }

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
        
        res.status(200).json({expense:expenses});
    } catch (err) {
        console.error('Error fetching expenses:', err);
        res.status(500).json({error: err});
    }
}
