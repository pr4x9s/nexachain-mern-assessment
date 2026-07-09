import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler.ts'
import type { CreateInvestmentReqBody, GetUserInvestmentsQuery } from '../validators/investment.validator.ts'
import { ApiError } from '../utils/ApiError.ts'
import { Investment, type IInvestment } from '../models/investment.model.ts'
import { ApiResponse } from '../utils/ApiResponse.ts'
import type { QueryFilter } from 'mongoose'
import { RoiHistory } from '../models/roiHistory.model.ts'



const createInvestment = asyncHandler(async (req: Request<{}, {}, CreateInvestmentReqBody>, res: Response) => {
    const { investmentAmount, planDetails } = req.body;

    const investmentStartDate = new Date();
    const investmentEndDate = new Date(investmentStartDate);
    investmentEndDate.setDate(investmentStartDate.getDate() + 30);

    const investment = await Investment.create({
        userReference: req.user?._id,
        investmentAmount,
        planDetails: planDetails.trim(),
        startDate: investmentStartDate,
        endDate: investmentEndDate,
        dailyRoiPercentage: 1.0,
        investmentStatus: 'Active'
    });

    if (!investment) {
        throw new ApiError(500, 'Failed to initialize the investment transaction record');
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, investment, 'Investment is active & processing succesfully')
    );
});


const getUserInvestments = asyncHandler(async (req: Request<{}, {}, {}, GetUserInvestmentsQuery>, res: Response) => {
    const { investmentStatus } = req.query;

    const queryFilter: QueryFilter<IInvestment> = { userReference: req.user?._id }

    if (investmentStatus) {
        queryFilter.investmentStatus = investmentStatus;
    }

    const investments = await Investment.find(queryFilter).sort({ createdAt: -1 }).lean();

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                investments,
                count: investments.length
            },
            'User investments retrieved successfully'
        )
    );
});


const getRoiHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, 'Unauthorized request');
    }

    const roiLogs = await RoiHistory.find({ userReference: userId })
    .populate('investmentReference', 'planDetails investmentAmount')
    .sort({ createdAt: -1 })
    .lean();
    
    return res
    .status(200)
    .json(
        new ApiResponse(200, roiLogs, 'Daily ROI ledger streaming logs synced successfully')
    );
});


export {
    createInvestment,
    getUserInvestments,
    getRoiHistory,
}