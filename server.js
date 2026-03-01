import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all route handlers
import contactHandler from './api/contact.js';
import dbHealthHandler from './api/db-health.js';
import errorLogHandler from './api/error-log.js';
import getAllReferralsHandler from './api/get-all-referrals.js';
import getContactsHandler from './api/get-contacts.js';
import getErrorLogsHandler from './api/get-error-logs.js';
import getReferrerHandler from './api/get_referrer.js';
import presaleStatsHandler from './api/presale-stats.js';
import registerHandler from './api/register.js';
import tokenPricesHandler from './api/token-prices.js';
import totalRegisteredHandler from './api/total-registered.js';
import totalReferralsHandler from './api/total_referrals.js';

// Giveaway routes
import completeTaskHandler from './api/giveaway/complete_task.js';
import enterGiveawayHandler from './api/giveaway/enter.js';
import getCompletedTasksHandler from './api/giveaway/get_completed_tasks.js';
import getPointsHandler from './api/giveaway/get_points.js';
import getPositionHandler from './api/giveaway/get_position.js';
import getStatsHandler from './api/giveaway/get_stats.js';
import getTweetsHandler from './api/giveaway/get_tweets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// API Routes
app.all('/api/contact', contactHandler);
app.all('/api/db-health', dbHealthHandler);
app.all('/api/error-log', errorLogHandler);
app.all('/api/get-all-referrals', getAllReferralsHandler);
app.all('/api/get-contacts', getContactsHandler);
app.all('/api/get-error-logs', getErrorLogsHandler);
app.all('/api/get_referrer', getReferrerHandler);
app.all('/api/presale-stats', presaleStatsHandler);
app.all('/api/register', registerHandler);
app.all('/api/token-prices', tokenPricesHandler);
app.all('/api/total-registered', totalRegisteredHandler);
app.all('/api/total_referrals', totalReferralsHandler);

// Giveaway routes
app.all('/api/giveaway/complete_task', completeTaskHandler);
app.all('/api/giveaway/enter', enterGiveawayHandler);
app.all('/api/giveaway/get_completed_tasks', getCompletedTasksHandler);
app.all('/api/giveaway/get_points', getPointsHandler);
app.all('/api/giveaway/get_position', getPositionHandler);
app.all('/api/giveaway/get_stats', getStatsHandler);
app.all('/api/giveaway/get_tweets', getTweetsHandler);

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback — all non-API routes serve index.html
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
