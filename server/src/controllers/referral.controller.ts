import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler.ts'
import { ApiResponse } from '../utils/ApiResponse.ts'
import { ApiError } from '../utils/ApiError.ts'
import { User } from '../models/user.model.ts'
import mongoose from 'mongoose'
import { ReferralIncome } from '../models/referralIncome.model.ts'



interface IReferralNode {
    _id: mongoose.Types.ObjectId;
    fullName: string;
    email: string;
    walletBalance: number;
    createdAt: Date;
    children: IReferralNode[];
}


// recursive helper to fetch downlines layer by layer
const buildReferralTree = async (parentUserId: mongoose.Types.ObjectId): Promise<IReferralNode[]> => {
    // fetch all direct downlines for the current parent node
    const directReferrals = await User.find({ referredBy: parentUserId }).select('_id fullName email walletBalance createdAt').lean();

    const treeNodes: IReferralNode[] = [];

    for (const referral of directReferrals) {
        // recursively find children for each direct referral
        const childrenNodes = await buildReferralTree(referral._id as mongoose.Types.ObjectId);
        
        treeNodes.push({
            _id: referral._id as mongoose.Types.ObjectId,
            fullName: referral.fullName,
            email: referral.email,
            walletBalance: referral.walletBalance,
            createdAt: referral.createdAt,
            children: childrenNodes
        });
    }

    return treeNodes;
};


// fetch direct referrals (1st level downline)
const getDirectReferrals = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, 'Unauthorized request');
    }

    // direct find where referredBy matches the logged-in user
    const directReferrals = await User.find({ referredBy: userId })
        .select('_id fullName email mobileNumber accountStatus walletBalance createdAt')
        .sort({ createdAt: -1 });

    return res
    .status(200)
    .json(
        new ApiResponse(200, directReferrals, 'Direct referrals retrieved successfully')
    );
});


// fetch complete recursive referral tree
const getCompleteReferralTree = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, 'Unauthorized request');
    }

    // build the tree dynamically starting from the current user
    const referralTree = await buildReferralTree(new mongoose.Types.ObjectId(userId));

    return res
    .status(200)
    .json(
        new ApiResponse(200, referralTree, 'Complete recursive referral tree compiled successfully')
    );
});


const getReferralIncomeHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    
    if (!userId) {
        throw new ApiError(401, 'Unauthorized request');
    }

    const incomeLogs = await ReferralIncome.find({ userWhoEarned: userId })
    .populate('userWhoGenerated', 'fullName email')
    .sort({ createdAt: -1 })
    .lean();

    return res
    .status(200)
    .json(
        new ApiResponse(200, incomeLogs, 'Referral level network logs synced successfully')
    );
});



export {
    getDirectReferrals,
    getCompleteReferralTree,
    getReferralIncomeHistory,
}