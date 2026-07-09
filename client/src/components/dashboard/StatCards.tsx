import { useDashboardStats } from '../../hooks/useDashboardData.ts'
import { formatCurrency } from '../../utils/format.ts'
import { Wallet, TrendingUp, Users, ShieldCheck } from 'lucide-react'



const StatCards = () => {
    const { data: stats, isLoading, isError } = useDashboardStats();

    const cardConfig = [
        {
            title: 'Wallet Balance',
            value: formatCurrency(stats?.data.walletBalance),
            icon: Wallet,
            colorClass: 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/5',
        },
        {
            title: 'Total Active Investments',
            value: formatCurrency(stats?.data.totalInvestments),
            icon: ShieldCheck,
            colorClass: 'text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/5',
        },
        {
            title: 'Cumulative ROI Profits',
            value: formatCurrency(stats?.data.totalRoiEarned),
            icon: TrendingUp,
            colorClass: 'text-amber-500 bg-amber-500/10 dark:bg-amber-500/5',
        },
        {
            title: 'Referral Network Income',
            value: formatCurrency(stats?.data.totalLevelIncomeEarned),
            icon: Users,
            colorClass: 'text-rose-500 bg-rose-500/10 dark:bg-rose-500/5',
        },
    ];

    // Loading Skeleton
    if (isLoading) {
        return (
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div 
                        key={index} 
                        className='p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 animate-pulse'
                    >
                        <div className='flex items-center justify-between'>
                            <div className='h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded' />
                            <div className='h-10 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl' />
                        </div>
                        <div className='mt-4 h-7 w-36 bg-zinc-200 dark:bg-zinc-800 rounded' />
                    </div>
                ))}
            </div>
        );
    }

    // Network Failure
    if (isError) {
        return (
            <div className='p-4 rounded-xl border border-red-200/60 bg-red-50/50 dark:bg-red-950/10 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm'>
                Failed to compile overview dashboard data metrics. Please refetch or check connectivity.
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            {cardConfig.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                    <div
                        key={idx}
                        className='p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200'
                    >
                        <div className='flex items-center justify-between'>
                            <span className='text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-tight'>
                                {card.title}
                            </span>
                            <div className={`p-2.5 rounded-xl ${card.colorClass}`}>
                                <IconComponent className='h-5 w-5 stroke-[1.75]' />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h3 className='text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight font-mono break-all whitespace-normal leading-relaxed max-w-full' title={card.value}>
                                {card.value}
                            </h3>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default StatCards