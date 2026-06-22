import type { Request, Response } from 'express';
import { User } from '../models/user.model';
import type { LoginReqBody, RegisterReqBody, TokenResponse } from '../types/types.ts'
import { ApiError } from '../utils/ApiError.ts'
import { asyncHandler } from '../utils/asyncHandler.ts'
import type mongoose from 'mongoose'
import crypto from 'node:crypto'
import { ApiResponse } from '../utils/ApiResponse.ts'
import { accessTokenCookieOptions, refreshTokenCookieOptions } from '../constants.ts'



const createUniqueReferralCode = () => crypto.randomBytes(4).toString('hex').toUpperCase();


const generateAccessAndRefreshTokens = async (userId: string): Promise<TokenResponse> => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, 'User does not exist');
        }

        const accessToken = user?.generateAccessToken();
        const refreshToken = user?.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user?.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken
        };
    }
    catch (error) {
        throw new ApiError(500, 'Something went wrong while generating access and refresh tokens');
    }
};


const registerUser = asyncHandler(async (req: Request<{}, {}, RegisterReqBody>, res: Response) => {
    const { fullName, email, mobileNumber, password, referralCodeUsed } = req.body;

    if ([fullName, email, mobileNumber, password].some(field => !field || field?.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { mobileNumber }]
    });

    if (existingUser) {
        throw new ApiError(409, 'User with this email or mobile number already exists');
    }

    let parentUserId: mongoose.Types.ObjectId | null = null;

    if (referralCodeUsed && referralCodeUsed.trim() !== '') {
        const parentUser = await User.findOne({ referralCode: referralCodeUsed.trim().toUpperCase() });

        if (!parentUser) {
            throw new ApiError(400, 'The provided referral code is invalid');
        }

        parentUserId = parentUser._id as mongoose.Types.ObjectId;
    }

    let referralCode = createUniqueReferralCode();

    const createUser = await User.create({
        fullName,
        email,
        mobileNumber,
        password,
        referralCode,
        referredBy: parentUserId,
        walletBalance: 0,
        totalRoiEarned: 0,
        totalLevelIncomeEarned: 0,
        accountStatus: 'Active'
    });

    const createdUser = await User.findById(createUser?._id).select('-password -refreshToken');

    if (!createdUser) {
        throw new ApiError(500, 'Something went wrong while registering the user');
    }


    return res
    .status(201)
    .json(
        new ApiResponse(201, { user: createdUser }, 'User registered successfully')
    );
});


const loginUser = asyncHandler(async (req: Request<{}, {}, LoginReqBody>, res: Response) => {
    const { email, password } = req.body;

    if ([email, password].some(field => !field || field?.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }

    const userExists = await User.findOne({
        $or: [{email: email.toLowerCase().trim()}]
    });

    if (!userExists) {
        throw new ApiError(404, 'User does not exist');
    }

    const isPasswordCorrect = await userExists.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(400, 'Invalid user credentials');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(userExists?._id.toString());

    const loggedInUser = await User.findById(userExists?._id).select('-password -refreshToken');

    return res
    .status(200)
    .cookie('accessToken', accessToken, accessTokenCookieOptions)
    .cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken: accessToken,
                refreshToken
            },
            'User logged in successfully'
        )
    );
});



export {
    registerUser,
    loginUser,
}