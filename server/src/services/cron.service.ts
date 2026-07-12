import cron from 'node-cron'
import { executeDailyPayoutEngine } from './payout.service';


/**
 * @function `initCronJobs`
 * @description Configures and boots up all native `node-cron` scheduling workflows.
 * Acts as a server daemon pipeline responsible for managing automated platform actions.
 * 
 * @returns Initialized global runtime scheduling instances.
 */

export const initCronJobs = () => {

    /**
     * Midnight ROI Distribution Routine
     * Cron Mask Expression 0 0 * * * -> Fires exactly at 12:00 AM every calender day
     */
    cron.schedule('0 0 * * *', async () => {
        console.log('[CRON] Midnight reached. Initializing daily ROI execution pipeline...');
        try {
            await executeDailyPayoutEngine();
        }
        catch (error) {
            console.error('[CRON FAILURE] Dynamic ledger payout automation process failed: ', error);
        }
    });

    console.log('[CRON] Automation schedules initialized successfully');
};