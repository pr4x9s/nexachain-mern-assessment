import cron from 'node-cron'
import { executeDailyPayoutEngine } from './payout.service';



export const initCronJobs = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('[CRON] Midnight reached. Initializing daily ROI execution pipeline...');
        try {
            await executeDailyPayoutEngine();
        }
        catch (error) {
            console.error('first');
        }
    });

    console.log('[CRON] Automation schedules initialized successfully');
};