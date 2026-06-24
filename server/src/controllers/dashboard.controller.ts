import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler.ts'
import { ApiResponse } from '../utils/ApiResponse.ts'
import { ApiError } from '../utils/ApiError.ts'
import { Investment } from '../models/investment.model.ts'
import { RoiHistory } from '../models/roiHistory.model.ts'
import { ReferralIncome } from '../models/referralIncome.model.ts'
import mongoose from 'mongoose'



interface IAggregationSumResult {
    total: number;
}


const getUserDashboardStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, 'Unauthorized request.');
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    
    const [investmentSum, roiSum, levelIncomeSum] = await Promise.all([
        
        // total active investments
        Investment.aggregate<IAggregationSumResult>()
            .match({
                userReference: userObjectId,
                investmentStatus: 'Active'
            })
            .group({
                _id: null,
                total: {
                    $sum: '$investmentAmount'
                }
            }),

        // cumulative ROI profits earned
        RoiHistory.aggregate<IAggregationSumResult>()
            .match({
                userReference: userObjectId,
                status: 'Processed'
            })
            .group({
                _id: null,
                total: {
                    $sum: '$roiAmount'
                }
            }),

        // cumulative multi-level referral commissions earned
        ReferralIncome.aggregate<IAggregationSumResult>()
            .match({
                userWhoEarned: userObjectId
            })
            .group({
                _id: null,
                total: {
                    $sum: '$incomeAmount'
                }
            })
    ]);
    
    const totalInvestments = investmentSum[0]?.total || 0;
    const totalRoiEarned = roiSum[0]?.total || 0;
    const totalLevelIncomeEarned = levelIncomeSum[0]?.total || 0;
    const walletBalance = req.user?.walletBalance || 0;

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                totalInvestments,
                totalRoiEarned,
                totalLevelIncomeEarned,
                walletBalance
            }, 
            'Dashboard overview statistics compiled successfully.'
        )
    );
});


export {
    getUserDashboardStats
}