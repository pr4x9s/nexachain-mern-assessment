import mongoose from 'mongoose'
import { Investment } from '../models/investment.model.ts'
import { RoiHistory } from '../models/roiHistory.model.ts';
import { User } from '../models/user.model.ts';
import { ReferralIncome } from '../models/referralIncome.model.ts';


/**
 * @function `executeDailyPayoutEngine`
 * @description The core distribution engine for the platform. It automatically scans all 
 * active contracts, verifies processing windows, calculates a 1% daily return on principal capital 
 * and recursively passes dynamic downline earnings up the referral hierarchy tree.
 * 
 * @async
 * @throws {`Error`} Aborts and rolls back the active MongoDB ACID transaction ledger if any failure occurs.
 * @returns {Promise<void>} Resolves successfully when all payouts and ledgers commit safely
 * 
 * @security Idempotency Guard - Drops duplicate payouts if executed multiple times within the same day.
 * @database Uses full multi-document ACID transactions via Mongoose sessions to ensure database consistency.
 */

export const executeDailyPayoutEngine = async (): Promise<void> => {
    // instantiate a isolated Mongoose session for multi-document transaction monitoring
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // define explicit system boundaries for the current calendar date block
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        // retrieve all active investment records bound to the active transaction context
        const activeInvestments = await Investment.find({
            investmentStatus: 'Active',
        }).session(session);
        console.log(`[DEBUG] Found ${activeInvestments.length} active investments to process.`);

        let processedCount = 0;
        let skippedCount = 0;

        // loop through each active contract independently within the secure context channel
        for (const investment of activeInvestments) {
            // 

            /**
             * Idempotency Guard:
             * Intercepts and blocks duplicate entries in case the cron schedule triggers twice.
             * Checks and validates if this specific investment already received an ROI payout today.
             */
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

            // ============ Phase 1: calculate 1% daily ROI ============
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
            // ============ Phase 1: calculate 1% daily ROI ============
            
            // ============ Phase 2: distribute multi-level referral income ============
            let currentUserId = investment.userReference;

            // parameters assigned by structural layer height: Level 1 (5%), Level 2 (3%), Level 3 (2%)
            const levelPercentages = [0.05, 0.03, 0.02];
            

            // traverse exactly up to 3 parent nodes up the hierarchy graph tree
            for (let level = 1; level <= 3; level++) {

                // fetch current node's upline association path securely
                const currentUser = await User.findById(currentUserId).select('referredBy').session(session);
                if (!currentUser || !currentUser.referredBy) break; // terminate tracking if path hits terminal root
                
                // extract structural upline node data profile
                const parentUser = await User.findById(currentUser.referredBy).session(session);
                if (!parentUser) break;

                // extract accurate matching commission rate for the current path tier height
                const percentage = levelPercentages[level - 1];
                const calculatedLevelIncome = parseFloat((calculatedRoi * percentage).toFixed(2));
                
                // log persistent network income allocation history
                await ReferralIncome.create([{
                    userWhoEarned: parentUser._id,
                    userWhoGenerated: investment.userReference,
                    referralLevel: level,
                    incomeAmount: calculatedLevelIncome
                }], { session });

                // credit dynamic yields securely to the parent account node
                await User.findByIdAndUpdate(
                    parentUser._id,
                    {
                        $inc: {
                            walletBalance: calculatedLevelIncome
                        }
                    },
                    { session }
                );

                // reassign pointers dynamically to continue moving upwards on next level loop
                currentUserId = parentUser._id as mongoose.Types.ObjectId;
            }
            
            processedCount++;
            // ============ Phase 2: distribute multi-level referral income ============
        }

        // commit all changes to the database together if every execution evaluates successfully
        await session.commitTransaction();
        console.log(`[PAYOUT ENGINE] Processed ${activeInvestments.length} active investments successfully`);
    }
    catch (error) {
        // roll back the entire transaction to leave the database completely untouched if any error happens
        await session.abortTransaction();
        console.error('[PAYOUT ENGINE CRITICAL ERROR] Transaction rolled back safely:', error);
        throw error;
    }
    finally {
        // terminate tracking pipeline cleanups to free server system memory
        session.endSession();
    }
};