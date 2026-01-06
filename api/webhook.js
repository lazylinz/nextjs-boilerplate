/**
 * Webhook Handler - Serverless Function
 * Accepts POST requests, processes payload, and forwards to Pollinations AI
 */

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;

    // Strip sensitive key fields
    const { apiKey, secret, token, password, ...safePayload } = payload;

    // Add nonce for request uniqueness and security
    const nonce = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    const processedPayload = {
      ...safePayload,
      nonce,
      timestamp: new Date().toISOString()
    };

    // Forward to Pollinations AI
    const pollinationsResponse = await fetch('https://api.pollinations.ai/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(processedPayload)
    });

    if (!pollinationsResponse.ok) {
      throw new Error(`Pollinations AI API error: ${pollinationsResponse.status}`);
    }

    const result = await pollinationsResponse.json();

    return res.status(200).json({
      success: true,
      message: 'Webhook processed and forwarded successfully',
      data: result
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
