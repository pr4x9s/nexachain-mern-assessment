import mongoose from 'mongoose'
import { Investment } from '../models/investment.model.ts'
import { RoiHistory } from '../models/roiHistory.model.ts';
import { User } from '../models/user.model.ts';
import { ReferralIncome } from '../models/referralIncome.model.ts';



export const executeDailyPayoutEngine = async () => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        const activeInvestments = await Investment.find({
            investmentStatus: 'Active',
        }).session(session);
        console.log(`[DEBUG] Found ${activeInvestments.length} active investments to process.`);

        let processedCount = 0;
        let skippedCount = 0;

        for (const investment of activeInvestments) {
            // check if this specific investment already received an ROI payout today
            const alreadyProcessed = await RoiHistory.findOne({
                investmentReference: investment._id,
                createdAt: {
                    $gte: startOfToday,
                    $lte: endOfToday
                }
            }).session(session);

            if (alreadyProcessed) {
                skippedCount++;
                continue;   // skip directly to the next investment. safe against duplicate cron firing
            }

            const principal = investment.investmentAmount;

            // Phase 1: calculate 1% daily ROI
            const calculatedRoi = parseFloat((principal * 0.01).toFixed(2));

            await RoiHistory.create([{
                userReference: investment.userReference,
                investmentReference: investment._id,
                roiAmount: calculatedRoi,
                status: 'Processed'
            }], { session });

            await User.findByIdAndUpdate(
                investment.userReference,
                {
                    $inc: {
                        walletBalance: calculatedRoi
                    }
                },
                { session }
            );

            // Phase 2: distribute multi-level referral income
            let currentUserId = investment.userReference;
            const levelPercentages = [0.05, 0.03, 0.02];

            for (let level = 1; level <= 3; level++) {
                const currentUser = await User.findById(currentUserId).select('referredBy').session(session);
                if (!currentUser || !currentUser.referredBy) break;

                const parentUser = await User.findById(currentUser.referredBy).session(session);
                if (!parentUser) break;

                const percentage = levelPercentages[level - 1];
                const calculatedLevelIncome = parseFloat((calculatedRoi * percentage).toFixed(2));

                await ReferralIncome.create([{
                    userWhoEarned: parentUser._id,
                    userWhoGenerated: investment.userReference,
                    referralLevel: level,
                    incomeAmount: calculatedLevelIncome
                }], { session });

                await User.findByIdAndUpdate(
                    parentUser._id,
                    {
                        $inc: {
                            walletBalance: calculatedLevelIncome
                        }
                    },
                    { session }
                );

                currentUserId = parentUser._id as mongoose.Types.ObjectId;
            }

            processedCount++;
        }

        await session.commitTransaction();
        console.log(`[PAYOUT ENGINE] Processed ${activeInvestments.length} active investments successfully`);
    }
    catch (error) {
        await session.abortTransaction();
        console.error('[PAYOUT ENGINE CRITICAL ERROR] Transaction rolled back safely:', error);
        throw error;
    }
    finally {
        session.endSession();
    }
};