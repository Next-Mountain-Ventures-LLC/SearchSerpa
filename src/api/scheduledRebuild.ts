import type { APIRoute } from 'astro';

// This endpoint will be called by a cron job twice daily
export const get: APIRoute = async () => {
  try {
    // Forward the request to our content update checker with the scheduled flag
    const contentCheckUrl = new URL(import.meta.env.SITE);
    contentCheckUrl.pathname = '/api/checkContentUpdates';
    contentCheckUrl.searchParams.set('scheduled', 'true');
    
    const response = await fetch(contentCheckUrl.toString());
    const result = await response.json();
    
    return new Response(JSON.stringify({
      success: true,
      scheduledRun: true,
      result
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in scheduled rebuild:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}