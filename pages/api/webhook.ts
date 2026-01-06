import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

interface WebhookPayload {
  event: string;
  timestamp: number;
  data: Record<string, unknown>;
}

type ResponseData = {
  success: boolean;
  message: string;
  data?: unknown;
};

/**
 * Webhook API Handler
 * Receives and processes webhook events
 * 
 * Environment Variables:
 * - WEBHOOK_SECRET: Secret key for validating webhook signatures
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): void {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }

  try {
    const webhookSecret = process.env.WEBHOOK_SECRET || 'your-secret-key';
    const signature = req.headers['x-webhook-signature'] as string;

    // Verify webhook signature if provided
    if (signature && webhookSecret) {
      const payload = JSON.stringify(req.body);
      const hash = crypto
        .createHmac('sha256', webhookSecret)
        .update(payload)
        .digest('hex');

      if (hash !== signature) {
        res.status(401).json({ success: false, message: 'Invalid signature' });
        return;
      }
    }

    const body = req.body as WebhookPayload;

    // Validate webhook payload
    if (!body.event || !body.data) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: event, data',
      });
      return;
    }

    // Log webhook event
    console.log(`[Webhook] Event: ${body.event}`, {
      timestamp: body.timestamp || new Date().getTime(),
      data: body.data,
    });

    // Process webhook based on event type
    switch (body.event) {
      case 'test':
        console.log('[Webhook] Test event received');
        break;
      case 'user.created':
        console.log('[Webhook] User created:', body.data);
        break;
      case 'user.updated':
        console.log('[Webhook] User updated:', body.data);
        break;
      default:
        console.log('[Webhook] Unknown event type:', body.event);
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Webhook received successfully',
      data: {
        event: body.event,
        processedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[Webhook Error]', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
