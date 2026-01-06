# Pollinations Webhook Bridge

Minimal Vercel serverless function that forwards POST requests to https://text.pollinations.ai/, removes key fields from the payload, and injects a nonce to avoid cached responses.

## Deployment

1. The repo is already connected to Vercel (or import at https://vercel.com/new).
2. Vercel will auto-build and deploy on push to main.
3. The endpoint will be: https://<your-project>.vercel.app/webhook

## How It Works

- Accepts POST requests to /webhook
- Strips common key fields (key, api_key, apiKey, authorization_key) from request body
- Removes sensitive headers (Authorization, host, connection, content-length)
- Injects a randomized nonce to prevent Pollinations AI cached responses
- Forwards the cleaned payload to https://text.pollinations.ai/
- Returns the upstream response with the same status and content-type

## Development

```bash
npm install
npm run dev
```

## License

MIT