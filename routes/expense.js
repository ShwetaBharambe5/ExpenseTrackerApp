const express = require('express');

const router = express.Router();

const userController = require('../controllers/expense');

router.post('/add-expense', userController.addExpense);
router.delete('/delete-expense/:id', userController.deleteExpense);
router.get('/get-expense', userController.getExpense);
router.get('/get-form', userController.getExpenseForm);

module.exports = router;