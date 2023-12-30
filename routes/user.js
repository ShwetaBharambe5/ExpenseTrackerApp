const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/add-expense', userController.addExpense);
router.delete('/delete-expense/:expenseId', userController.deleteExpense);
router.get('/get-expense', userController.getExpense);
router.get('/', userController.getExpenseForm);

module.exports = router;