import { NextRequest, NextResponse } from 'next/server';
import requestQueue from '@/lib/ml/request-queue';

/**
 * Admin endpoint to view queue stats
 * NOTE: In production, this should be protected by authentication
 */
export async function GET() {
  try {
    const stats = await requestQueue.getStats();
    
    return NextResponse.json({
      stats,
      note: "This endpoint should be protected by authentication in production"
    });
  } catch (error) {
    console.error('Error getting queue stats:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve queue statistics' },
      { status: 500 }
    );
  }
}

/**
 * Clear request queue (admin only)
 * NOTE: This would need proper authentication in production
 */
export async function DELETE(request: NextRequest) {
  // Basic API key protection (should use proper auth in production)
  const authHeader = request.headers.get('authorization');
  const apiKey = process.env.ADMIN_API_KEY;
  
  if (!apiKey || !authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== apiKey) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    // Get previous stats
    const previousStats = await requestQueue.getStats();
    
    // Clear the queue
    const removedCount = await requestQueue.clearCache();
    
    return NextResponse.json({
      message: `Queue cleared successfully (${removedCount} requests removed)`,
      previousStats
    });
  } catch (error) {
    console.error('Error clearing queue:', error);
    return NextResponse.json(
      { error: 'Failed to clear queue' },
      { status: 500 }
    );
  }
} 