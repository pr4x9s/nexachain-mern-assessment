import type { LucideIcon } from 'lucide-react'

export interface Config {
    baseUrl: string;
}

export type TabItems<T> = {
    id: T;
	name: string;
	icon: LucideIcon;
}[];

export interface ReferedBySummary {
    _id: string;
    fullName: string;
    email: string;
}

export interface User {
    _id: string;
    fullName: string;
    email: string;
    mobileNumber: string;
    referralCode: string;
    referredBy: ReferedBySummary | null;
    walletBalance: number;
    totalRoiEarned: number;
    totalLevelIncomeEarned: number;
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

export interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isPending?: boolean;
}

export interface DashboardStats extends Pick<User, 'totalRoiEarned' | 'totalLevelIncomeEarned' | 'walletBalance'> {
    totalInvestments: number;
}

export type DirectReferralUser = Pick<User, '_id' | 'fullName' | 'email' | 'mobileNumber' | 'accountStatus' | 'walletBalance' | 'createdAt'>;

export interface ReferralNode extends Pick<User, '_id' | 'fullName' | 'email' | 'walletBalance' | 'createdAt'> {
    children: ReferralNode[];
}

export interface Investment {
    _id: string;
    userReference: string;
    investmentAmount: number;
    planDetails: string;
    startDate: string;
    endDate: string;
    dailyRoiPercentage: number;
    investmentStatus: 'Active' | 'Completed' | 'Cancelled';
    createdAt: string;
    updatedAt: string;
}

export interface GetUserInvestmentsResBody {
    investments: Investment[];
    count: number;
}

export interface RoiHistoryItem {
    _id: string;
    userReference: string;
    investmentReference: Pick<Investment, '_id' | 'investmentAmount' | 'planDetails'>;
    roiAmount: number;
    status: 'Processed' | 'Failed' | 'Pending';
    date: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReferralIncomeItem {
    _id: string;
    userWhoEarned: string;
    userWhoGenerated: Pick<User, '_id' | 'fullName' | 'email'>;
    referralLevel: number;
    incomeAmount: number;
    date: string;
    createdAt: string;
    updatedAt: string;
}