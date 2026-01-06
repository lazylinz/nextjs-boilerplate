# Express.js Server

A modern Express.js server setup with Node 24.x runtime.

## Features

- ✅ Express.js framework
- ✅ Node.js 24.x support
- ✅ CORS enabled
- ✅ JSON parsing middleware
- ✅ Health check endpoint
- ✅ Webhook support
- ✅ Environment variable support

## Prerequisites

- Node.js 24.x or higher
- npm or yarn

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Health Check
- **GET** `/health`
  - Returns server status
  - Response: `{ status: 'ok', message: 'Server is running' }`

### API Root
- **GET** `/api`
  - Returns welcome message
  - Response: `{ message: 'Welcome to Express API' }`

### Webhook
- **POST** `/api/webhook`
  - Accepts webhook events
  - Body: `{ event: string, data: any }`
  - Response: `{ success: true, message: string, event: string }`

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Node.js runtime from `package.json`
4. Set environment variables in Vercel dashboard if needed
5. Deploy

### Environment Setup

The `vercel.json` configuration file handles deployment settings.

### Local Testing Before Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Test locally
vercel dev

# Deploy
vercel
```

## Project Structure

```
.
├── server.js           # Main Express server entry point
├── package.json        # Dependencies and scripts
├── .env                # Environment variables (not in git)
├── .gitignore          # Git ignore rules
├── vercel.json         # Vercel deployment config
├── LICENSE             # MIT License
├── README.md           # This file
└── api/
    └── webhook.js      # Webhook handler reference
```

## License

MIT

## Support

For issues or questions, please check the repository issues page.
