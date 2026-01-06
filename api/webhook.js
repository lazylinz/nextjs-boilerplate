const { randomBytes } = require('crypto');

module.exports = async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vercel/Next parses JSON; if not, try to parse
    const body = (req.body && typeof req.body === 'object') ? req.body : JSON.parse(req.body || '{}');

    // Remove common key fields from payload
    const { key, api_key, apiKey, authorization_key, ...rest } = body;

    // Add nonce to prevent caching
    const nonce = randomBytes(16).toString('hex');
    const forwarded = { ...rest, nonce };

    // Build headers to forward (skip sensitive / irrelevant headers)
    const forwardHeaders = {};
    for (const [k, v] of Object.entries(req.headers || {})) {
      const lk = k.toLowerCase();
      if (['host', 'content-length', 'connection', 'authorization'].includes(lk)) continue;
      forwardHeaders[lk] = v;
    }
    forwardHeaders['content-type'] = 'application/json';

    const upstream = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: forwardHeaders,
      body: JSON.stringify(forwarded),
    });

    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    const payload = await upstream.arrayBuffer();
    const buffer = Buffer.from(payload);

    // Return upstream response with appropriate status and content type
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Content-Type', contentType);
    res.status(upstream.status).send(buffer);
  } catch (err) {
    console.error('Webhook bridge error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};