import type { APIRoute } from 'astro';
import { createHash } from 'crypto';
import fs from 'fs/promises';
import path from 'path';

// File to store the content hash
const HASH_FILE_PATH = path.resolve('.content-hash.json');

// WordPress API endpoints
const WP_API_BASE = 'https://blog.nxtmt.ventures/wp-json/wp/v2';
const SEARCHSERPA_CATEGORY_ID = 4;

// Function to fetch posts from WordPress
async function fetchWordPressPosts() {
  try {
    const response = await fetch(
      `${WP_API_BASE}/posts?categories=${SEARCHSERPA_CATEGORY_ID}&_fields=id,modified,title&per_page=20`
    );
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    throw error;
  }
}

// Generate a hash from post data
function generateContentHash(posts: any[]): string {
  const contentString = JSON.stringify(posts.map(post => ({
    id: post.id,
    modified: post.modified
  })));
  
  return createHash('md5').update(contentString).digest('hex');
}

// Get the stored hash
async function getStoredHash(): Promise<{hash: string, lastChecked: string} | null> {
  try {
    const data = await fs.readFile(HASH_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet or other error
    return null;
  }
}

// Store the new hash
async function storeHash(hash: string): Promise<void> {
  const data = {
    hash,
    lastChecked: new Date().toISOString()
  };
  
  await fs.writeFile(HASH_FILE_PATH, JSON.stringify(data, null, 2));
}

// Trigger a rebuild
async function triggerRebuild() {
  // This would be replaced with actual build command
  // For example, calling your hosting platform's API or webhook
  console.log('🔄 Triggering rebuild due to content changes');

  // In a real environment, you would call your hosting platform's API
  // or trigger a GitHub Actions workflow to rebuild the site

  return true;
}

// API route handler
export const get: APIRoute = async ({ request }) => {
  // Check if this is a scheduled run or a manual check
  const url = new URL(request.url);
  const isScheduledRun = url.searchParams.get('scheduled') === 'true';
  
  // Check the current time to see if it should run (5am or 5pm)
  if (isScheduledRun) {
    const now = new Date();
    const hour = now.getHours();
    
    // Only run at 5am (5) or 5pm (17)
    if (hour !== 5 && hour !== 17) {
      return new Response(JSON.stringify({
        success: true,
        rebuilt: false,
        reason: `Not scheduled run time. Current hour: ${hour}`
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
  
  try {
    // Fetch latest posts
    const posts = await fetchWordPressPosts();
    
    // Generate hash of current content
    const currentHash = generateContentHash(posts);
    
    // Get previously stored hash
    const storedData = await getStoredHash();
    
    // Initialize result object
    const result: {
      success: boolean;
      rebuilt: boolean;
      reason: string;
      newContent?: boolean;
      lastChecked?: string;
    } = {
      success: true,
      rebuilt: false,
      reason: ''
    };
    
    // Check if we need to rebuild
    if (!storedData) {
      // First run, store hash but don't rebuild
      await storeHash(currentHash);
      result.rebuilt = false;
      result.reason = 'First run, storing initial content state';
    } else if (currentHash !== storedData.hash) {
      // Content has changed, trigger rebuild
      await triggerRebuild();
      await storeHash(currentHash);
      result.rebuilt = true;
      result.newContent = true;
      result.reason = 'Content changes detected';
    } else {
      // No changes
      result.rebuilt = false;
      result.newContent = false;
      result.reason = 'No content changes detected';
    }
    
    // Add last checked time if available
    if (storedData) {
      result.lastChecked = storedData.lastChecked;
    }
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in content update check:', error);
    
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
