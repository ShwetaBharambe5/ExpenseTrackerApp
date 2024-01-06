const express = require('express');

const userAuthentication = require('../middleware/auth');

const router = express.Router();

const userController = require('../controllers/expense');

router.post('/add-expense', userAuthentication.authenticate, userController.addExpense);
router.delete('/delete-expense/:id', userAuthentication.authenticate, userController.deleteExpense);
router.get('/get-expense', userAuthentication.authenticate, userController.getExpense);
//router.get('/get-form', userController.getExpenseForm);

module.exports = router;