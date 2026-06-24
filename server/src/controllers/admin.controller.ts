import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler.ts'
import { executeDailyPayoutEngine } from '../services/payout.service.ts';
import { ApiResponse } from '../utils/ApiResponse.ts';



const triggerDailyPayoutManually = asyncHandler(async (req: Request, res: Response) => {
    await executeDailyPayoutEngine();

    return res
    .status(200)
    .json(
        new ApiResponse(200, null, 'Daily ROI and Level Income calculated and distributed successfully.')
    );
});


export {
    triggerDailyPayoutManually
}