# Next.js 16 Boilerplate

A modern, production-ready Next.js 16 boilerplate with TypeScript, webhook API integration, and Vercel configuration.

## 🚀 Features

- **Next.js 16**: Latest version with App Router support
- **TypeScript**: Full type safety with strict mode enabled
- **React 19**: Latest React version with new features
- **Webhook API**: Pre-configured API route for webhook handling with signature verification
- **Vercel Ready**: Optimized configuration for Vercel deployment
- **ESLint & TypeScript**: Configured for code quality
- **Environment Variables**: Pre-configured for different environments

## 📋 Project Structure

```
├── pages/
│   ├── _document.tsx       # Custom document wrapper
│   ├── index.tsx           # Home page
│   └── api/
│       └── webhook.ts      # Webhook API endpoint
├── public/                 # Static assets
├── .gitignore             # Git ignore rules
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── vercel.json            # Vercel deployment configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.17 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lazylinz/nextjs-boilerplate.git
cd nextjs-boilerplate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Start development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📡 Webhook API

The webhook API is available at `/api/webhook` and accepts POST requests.

### Request Format

```json
{
  "event": "user.created",
  "timestamp": 1704542412000,
  "data": {
    "userId": "123",
    "email": "user@example.com"
  }
}
```

### Request Headers

- `Content-Type: application/json`
- `X-Webhook-Signature: <signature>` (optional, for signature verification)

### Signature Verification

To verify webhook signatures, set the `WEBHOOK_SECRET` environment variable and include the signature header:

```typescript
const crypto = require('crypto');
const payload = JSON.stringify(body);
const signature = crypto
  .createHmac('sha256', process.env.WEBHOOK_SECRET)
  .update(payload)
  .digest('hex');
```

### Supported Events

- `test` - Test webhook event
- `user.created` - User creation event
- `user.updated` - User update event
- Custom events can be added to the switch statement

### Response Format

```json
{
  "success": true,
  "message": "Webhook received successfully",
  "data": {
    "event": "user.created",
    "processedAt": "2024-01-06T11:00:12.000Z"
  }
}
```

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Vercel will automatically detect Next.js and configure the build settings
3. Add environment variables in Vercel dashboard
4. Deploy with a single push to main branch

### Environment Variables for Production

```bash
WEBHOOK_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### TypeScript

Strict mode is enabled for better type safety. Modify `tsconfig.json` to adjust compiler options.

### Next.js

Key settings in `next.config.js`:
- `reactStrictMode: true` - Highlight potential problems
- `swcMinify: true` - Use SWC for faster builds
- Custom page extensions configuration

### Vercel

Modify `vercel.json` to:
- Set build and dev commands
- Configure environment variables
- Set API function max duration
- Configure regions

## 🔒 Security

- Environment variables are never exposed to the browser
- Webhook signature verification prevents unauthorized requests
- TypeScript strict mode catches type-related bugs
- Dependencies are regularly updated

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 📝 License

MIT License - feel free to use this boilerplate for your projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Created on**: 2026-01-06
**Next.js Version**: 16.0.0+
**React Version**: 19.0.0+
