import mongoose, { Document, Schema } from 'mongoose'



export interface IRoiHistory extends Document {
    userReference: mongoose.Types.ObjectId;
    investmentReference: mongoose.Types.ObjectId;
    roiAmount: number;
    date: Date;
    status: 'Processed' | 'Failed' | 'Pending';
    createdAt: Date;
    updatedAt: Date;
}

const roiHistorySchema = new Schema<IRoiHistory>(
    {
        userReference: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User reference is required']
        },
        investmentReference: {
            type: Schema.Types.ObjectId,
            ref: 'Investment',
            required: [true, 'Investment reference is required']
        },
        roiAmount: {
            type: Number,
            required: [true, 'ROI amount is required'],
            min: [0, 'ROI amount cannot be negative']
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
            default: Date.now
        },
        status: {
            type: String,
            enum: ['Processed', 'Failed', 'Pending'],
            default: 'Processed',
            required: [true, 'Status is required']
        }
    },
    {
        timestamps: true
    }
);

roiHistorySchema.index({ investmentReference: 1, date: -1 });
roiHistorySchema.index({ userReference: 1, createdAt: -1 });

export const RoiHistory = mongoose.model<IRoiHistory>('RoiHistory', roiHistorySchema);