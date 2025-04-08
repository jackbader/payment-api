# Teller API Integration

A simple Node.js Express API that integrates with the Teller API for banking data.

## Setup

1. Make sure your Teller credentials (certificate.pem and private_key.pem) are in the `teller` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Update the `.env` file with your configuration if needed
4. Start the server:
   ```
   npm start
   ```

## API Endpoints

- `GET /`: Health check endpoint
- `GET /accounts`: List all accounts
- `GET /accounts/:accountId`: Get details for a specific account
- `GET /accounts/:accountId/transactions`: Get transactions for a specific account

## Development

For development with auto-reload:
```
npm run dev
```