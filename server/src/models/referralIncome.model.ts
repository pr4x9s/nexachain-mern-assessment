import mongoose, { Document, Schema } from 'mongoose'



export interface IReferralIncome extends Document {
    userWhoEarned: mongoose.Types.ObjectId,
    userWhoGenerated: mongoose.Types.ObjectId,
    referralLevel: number;
    incomeAmount: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}


const referralIncomeSchema = new Schema<IReferralIncome>(
    {
        userWhoEarned: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User who receives the income is required'],
        },
        userWhoGenerated: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User who generated the income is required']
        },
        referralLevel: {
            type: Number,
            required: [true, 'Referral level is required'],
            min: [1, 'Level cannot be less than 1']
        },
        incomeAmount: {
            type: Number,
            required: [true, 'Income amount is required'],
            min: [0, 'Income amount cannot be negative']
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
            default: Date.now
        },
    },
    {
        timestamps: true
    }
);

referralIncomeSchema.index({ userWhoEarned: 1, createdAt: -1 });
referralIncomeSchema.index({ userWhoEarned: 1, referralLevel: 1 });

export const ReferralIncome = mongoose.model<IReferralIncome>('ReferralIncome', referralIncomeSchema);