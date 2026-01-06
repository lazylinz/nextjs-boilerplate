# Next.js Boilerplate with Vercel Serverless Architecture

A modern Next.js boilerplate built on Vercel's serverless platform with API routes for webhook handling and Pollinations AI integration.

## Features

- **Vercel Serverless**: Deployed serverless functions without Express or custom server
- **Node.js 24.x**: Modern runtime with latest features
- **Webhook Handler**: POST endpoint that processes and forwards payloads to Pollinations AI
- **Security**: Strips sensitive keys before forwarding requests
- **Nonce Generation**: Adds request uniqueness and security tokens

## Project Structure

```
.
├── api/
│   └── webhook.js        # Serverless webhook handler function
├── vercel.json          # Vercel configuration
├── package.json         # Project dependencies and scripts
├── README.md            # This file
├── LICENSE              # MIT License
└── .gitignore           # Git ignore rules
```

## Getting Started

### Prerequisites

- Node.js 24.x or higher
- Vercel CLI (optional, for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lazylinz/nextjs-boilerplate.git
   cd nextjs-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the Vercel dev port).

### Building for Production

Build the project:

```bash
npm run build
```

### Starting the Production Server

Start the production server:

```bash
npm start
```

## API Endpoints

### POST /api/webhook

Webhook endpoint that processes incoming requests and forwards them to Pollinations AI.

**Request Body:**
```json
{
  "message": "Your request message",
  "model": "desired-model"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook processed and forwarded successfully",
  "data": { /* Pollinations AI response */ }
}
```

**Features:**
- Accepts POST requests only (returns 405 for other methods)
- Strips sensitive fields: `apiKey`, `secret`, `token`, `password`
- Adds a unique nonce to each request
- Includes timestamp in ISO 8601 format
- Forwards processed payload to Pollinations AI API
- Comprehensive error handling and logging

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Vercel will automatically detect the Next.js project and configure deployment
4. Your API routes will be automatically deployed as serverless functions

### Environment Variables

Add any required environment variables in the Vercel Dashboard under Project Settings > Environment Variables.

## Security

- Sensitive fields (API keys, passwords, tokens) are automatically stripped from forwarded requests
- Each request is assigned a unique nonce for security and tracking
- Requests are validated (POST only)
- Error messages are descriptive but don't expose internal details

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Lazy Linz (@lazylinz)

## Support

For issues, questions, or contributions, please open an issue or submit a pull request on GitHub.
