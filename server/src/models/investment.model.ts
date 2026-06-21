import mongoose, { Document, Schema } from 'mongoose'



export interface IInvestment extends Document {
    userReference: mongoose.Types.ObjectId,
    investmentAmount: number;
    planDetails: string;
    startDate: Date;
    endDate: Date;
    dailyRoiPercentage: number;
    investmentStatus: 'Active' | 'Completed' | 'Cancelled';
    createdAt: Date;
    updatedAt: Date;
}


const investmentSchema = new Schema<IInvestment>(
    {
        userReference: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User reference is required'],
            index: true
        },
        investmentAmount: {
            type: Number,
            required: [true, 'Investment amount is required'],
            default: 0
        },
        planDetails: {
            type: String,
            required: [true, 'Plan details are required'],
            trim: true
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
            default: Date.now
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required']
        },
        dailyRoiPercentage: {
            type: Number,
            required: [true, 'Daily ROI percentage is required'],
            default: 0
        },
        investmentStatus: {
            type: String,
            enum: ['Active', 'Completed', 'Cancelled'],
            default: 'Active'
        },
    },
    {
        timestamps: true
    }
);

investmentSchema.index({ investmentStatus: 1, userReference: 1 });

export const Investment = mongoose.model<IInvestment>('Investment', investmentSchema);