const express = require('express');
const router = express.Router();
const { getTransactions, getStatistics } = require('../controllers/transactionController');


router.get('/transactions', getTransactions);


router.get('/statistics', getStatistics);

module.exports = router;
