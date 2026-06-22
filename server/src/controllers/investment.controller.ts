import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler.ts'
import type { CreateInvestmentReqBody } from '../validators/investment.validator.ts'
import { ApiError } from '../utils/ApiError.ts'
import { Investment } from '../models/investment.model.ts';
import { ApiResponse } from '../utils/ApiResponse.ts';



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


export {
    createInvestment,
}