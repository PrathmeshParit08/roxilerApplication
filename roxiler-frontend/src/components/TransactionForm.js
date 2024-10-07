// src/components/TransactionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTransaction = { amount, description, date };

        try {
            await axios.post('http://localhost:5050/api/transactions', newTransaction);
            alert('Transaction added!');
            setAmount('');
            setDescription('');
            setDate('');
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;
