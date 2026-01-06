// Express webhook handler
// This file is kept for reference - actual webhook logic is in server.js

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { event, data } = req.body;
    
    console.log('Webhook received:', {
      event,
      timestamp: new Date().toISOString(),
      data
    });
    
    return res.status(200).json({
      success: true,
      message: 'Webhook processed successfully',
      event
    });
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}
