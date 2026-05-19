import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Health check endpoint
 */
export default function handler(
  req: VercelRequest,
  res: VercelResponse
): void {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
}
