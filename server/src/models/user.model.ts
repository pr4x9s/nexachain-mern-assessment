import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt, { type Secret } from 'jsonwebtoken'
import conf from '../conf/conf.ts'



export interface IUser extends Document {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    referralCode: string;
    referredBy: mongoose.Types.ObjectId | null; // parent user
    walletBalance: number;
    totalRoiEarned: number;
    totalLevelIncomeEarned: number;
    accountStatus: 'Active' | 'Suspended' | 'Pending';
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}


const userSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        mobileNumber: {
            type: String,
            required: [true, 'Mobile number is required'],
            unique: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        referralCode: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Referral code is required']
        },
        referredBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        walletBalance: {
            type: Number,
            default: 0
        },
        totalRoiEarned: {
            type: Number,
            default: 0
        },
        totalLevelIncomeEarned: {
            type: Number,
            default: 0
        },
        accountStatus: {
            type: String,
            enum: ['Active', 'Suspended', 'Pending'],
            default: 'Active'
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre<IUser>('save', async function () {
    if (!this.isModified('password')) return;

    try {
        this.password = await bcrypt.hash(this.password, 10);
    }
    catch (error: any) {
        throw error;
    }
});

userSchema.methods.isPasswordCorrect = async function (this: IUser, password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function (this: IUser): string {
    return jwt.sign(
        {
            _id: this._id
        },
        conf.accessTokenSecret as Secret,
        {
            expiresIn: conf.accessTokenExpiry as any
        }
    )
}

userSchema.methods.generateRefreshToken = function (this: IUser): string {
    return jwt.sign(
        {
            _id: this._id
        },
        conf.refreshTokenSecret as Secret,
        {
            expiresIn: conf.refreshTokenExpiry as any
        }
    )
}

export const User = mongoose.model<IUser>('User', userSchema);