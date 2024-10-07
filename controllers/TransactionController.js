const Transaction = require('../models/Transaction');

// Fetch transactions based on query params (e.g., month, search, pagination)
const getTransactions = async (req, res) => {
    const { month, search = '', page = 1, perPage = 10 } = req.query;
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    const searchRegex = new RegExp(search, 'i');

    try {
        const transactions = await Transaction.find({
            dateOfSale: { $gte: startDate, $lt: endDate },
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { price: search ? Number(search) : { $exists: true } }
            ]
        })
        .skip((page - 1) * perPage)
        .limit(perPage);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};

// Fetch sales statistics for the month
const getStatistics = async (req, res) => {
    const { month } = req.query;
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    try {
        const totalSaleAmount = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
            { $group: { _id: null, totalAmount: { $sum: '$price' } } }
        ]);

        const totalSoldItems = await Transaction.countDocuments({ dateOfSale: { $gte: startDate, $lt: endDate }, sold: true });
        const totalNotSoldItems = await Transaction.countDocuments({ dateOfSale: { $gte: startDate, $lt: endDate }, sold: false });

        res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics' });
    }
};

module.exports = { getTransactions, getStatistics };
