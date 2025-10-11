# WordPress Content Update System

This system automatically checks for new blog content at 5:00am and 5:00pm daily and triggers a rebuild when new content is detected.

## How It Works

1. The system maintains a hash of the current WordPress blog content state
2. At scheduled times, it fetches the latest posts from the WordPress API
3. If the content has changed (new posts, updates to existing posts), it triggers a rebuild
4. Only rebuilds when necessary, saving build minutes and ensuring fresh content

## API Endpoints

### `/api/checkContentUpdates`

Manually check if content has changed and trigger a rebuild if necessary.

**Query Parameters:**
- `scheduled`: Set to `true` when called by the scheduler (restricts to running at 5am/5pm)

**Response:**
```json
{
  "success": true,
  "rebuilt": true|false,
  "reason": "Content changes detected",
  "newContent": true|false,
  "lastChecked": "2025-10-11T17:00:00Z"
}
```

### `/api/scheduledRebuild`

Endpoint designed to be called by a CRON job twice daily.

**Response:**
```json
{
  "success": true,
  "scheduledRun": true,
  "result": {
    // Result from checkContentUpdates
  }
}
```

## Setting Up the CRON Job

To ensure the content check runs at exactly 5:00am and 5:00pm daily, set up a CRON job with your hosting provider:

### Example CRON Configuration:

```
0 5,17 * * * curl -X GET https://yourdomain.com/api/scheduledRebuild
```

### With Vercel:

1. Go to your project settings
2. Navigate to the "Cron Jobs" section
3. Create two new cron jobs:
   - Name: "Morning Content Check"
     - Schedule: `0 5 * * *`
     - HTTP Method: GET
     - Path: `/api/scheduledRebuild`
   - Name: "Evening Content Check"
     - Schedule: `0 17 * * *`
     - HTTP Method: GET
     - Path: `/api/scheduledRebuild`

## Manual Testing

You can manually trigger a content check by visiting:

```
https://yourdomain.com/api/checkContentUpdates
```

This will check for content updates regardless of the time of day.

## Implementation Details

- The content hash is stored in a `.content-hash.json` file
- Only posts from the SearchSerpa category (ID: 4) are monitored
- The hash is generated based on post IDs and modification timestamps
- The system is designed to be efficient and avoid unnecessary rebuilds