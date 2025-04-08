const express = require('express');
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const app = express();
app.use(express.json());

// Read Teller credentials from environment variables
const certificate = Buffer.from(process.env.TELLER_CERTIFICATE, 'base64');
const privateKey = Buffer.from(process.env.TELLER_PRIVATE_KEY, 'base64');


// Create HTTPS agent with Teller credentials
const httpsAgent = new https.Agent({
  cert: certificate,
  key: privateKey,
});

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// API routes
app.get('/', (req, res) => {
  res.json({ message: 'Teller API Integration Service' });
});

// Get accounts
app.get('/accounts', async (req, res, next) => {
  try {
    const response = await axios.get(`${process.env.TELLER_API_URL}/accounts`, {
      httpsAgent,
      auth: {
        username: process.env.BANK_TOKEN,
        password: ''
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching accounts:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data,
    });
  }
});

// Get account details
app.get('/accounts/:accountId', async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const response = await axios.get(`${process.env.TELLER_API_URL}/accounts/${accountId}`, {
      httpsAgent,
      auth: {
        username: process.env.BANK_TOKEN,
        password: ''
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching account ${req.params.accountId}:`, error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data,
    });
  }
});

// get account balances
app.get('/accounts/:accountId/balances', async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const response = await axios.get(`${process.env.TELLER_API_URL}/accounts/${accountId}/balances`, {
      httpsAgent,
      auth: {
        username: process.env.BANK_TOKEN,
        password: ''
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching account ${req.params.accountId}:`, error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data,
    });
  }
});

// Get account transactions
app.get('/accounts/:accountId/transactions', async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const response = await axios.get(`${process.env.TELLER_API_URL}/accounts/${accountId}/transactions`, {
      httpsAgent,
      auth: {
        username: process.env.BANK_TOKEN,
        password: ''
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching transactions for account ${req.params.accountId}:`, error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data,
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});