import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// API routes
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Welcome to Express API' });
});

// Webhook endpoint
app.post('/api/webhook', (req, res) => {
  try {
    const { event, data } = req.body;
    
    console.log('Webhook received:', {
      event,
      timestamp: new Date().toISOString(),
      data
    });
    
    res.status(200).json({
      success: true,
      message: 'Webhook processed successfully',
      event
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
