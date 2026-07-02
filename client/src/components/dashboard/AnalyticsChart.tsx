import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useDashboardStats } from '../../hooks/useDashboardData';
import { formatCurrency } from '../../utils/format';



const AnalyticsChart: React.FC = () => {

    const { data: stats, isLoading, isError } = useDashboardStats();
    
    const chartData = [
        {
            name: 'Active Capital',
            amount: stats?.data.totalInvestments || 0,
        },
        {
            name: 'ROI Profits',
            amount: stats?.data.totalRoiEarned || 0,
        },
        {
            name: 'Network Commissions',
            amount: stats?.data.totalLevelIncomeEarned || 0,
        },
    ];

    if (isLoading) {
        return (
            <div className='p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 backdrop-blur-sm h-80 flex flex-col justify-between animate-pulse'>
                <div className='h-5 w-48 bg-zinc-200 dark:bg-zinc-800 rounded' />
                <div className='h-48 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl' />
            </div>
        );
    }

    if (isError) return null;

    return (
        <div className='p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm'>
            <div className='mb-6'>
                <h3 className='text-base font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight'>
                    Earnings & Portfolio Breakdown
                </h3>
                <p className='text-xs text-zinc-500 dark:text-zinc-400 mt-0.5'>
                    Visual comparison of asset allocations and multi-level performance metrics.
                </p>
            </div>

            <div className='h-72 w-full text-xs font-mono'>
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id='chartColor' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='5%' stopColor='rgb(99, 102, 241)' stopOpacity={0.2}/>
                                <stop offset='95%' stopColor='rgb(99, 102, 241)' stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid 
                            strokeDasharray='3 3' 
                            vertical={false} 
                            className='stroke-zinc-100 dark:stroke-zinc-800/60' 
                        />
                        <XAxis 
                            dataKey='name'
                            axisLine={false}
                            tickLine={false}
                            className='fill-zinc-400 dark:fill-zinc-500'
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => `₹${val}`}
                            className='fill-zinc-400 dark:fill-zinc-500'
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--tw-shared-bg, #ffffff)',
                                border: '1px solid var(--tw-shared-border, #e4e4e7)',
                                borderRadius: '0.75rem',
                                fontFamily: 'monospace',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                            }}
                            labelClassName='text-zinc-500 dark:text-zinc-400 font-bold mb-1'
                            itemStyle={{ color: '#238FED' }}
                            formatter={(value) => {
                                const numericVal = typeof value === 'string' ? parseFloat(value) : Number(value);
                                return [formatCurrency(numericVal || 0), 'Value'];
                            }}
                        />
                        <Area 
                            type='monotone'
                            dataKey='amount'
                            stroke='#238FED'
                            strokeWidth={2}
                            fillOpacity={1}
                            fill='url(#chartColor)'
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default AnalyticsChart