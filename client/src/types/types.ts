export interface Config {
    baseUrl: string;
}

export interface User {
    _id: string;
    fullName: string;
    email: string;
    mobileNumber: string;
    referralCode: string;
    referredBy: string;
    walletBalance: string;
    totalRoiEarned: string;
    totalLevelIncomeEarned: string;
    accountStatus: 'Active' | 'Suspended' | 'Pending';
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export interface ValidationError {
    field?: string;
    message: string;
}

export interface ApiErrorResponse {
    statusCode: number;
    data: null;
    message: string;
    success: boolean;
    errors: ValidationError[];
}

export interface RefreshTheAccessTokenResBody {
    user: User
    accessToken: string;
    refreshToken: string;
}