import { useState, useMemo, useRef, useEffect } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useDirectReferrals } from '../../hooks/useDashboardData.ts'
import { formatCurrency } from '../../utils/format.ts'
import { format, formatDistanceToNow } from 'date-fns'
import { Search, ChevronLeft, ChevronRight, UserCheck, AlertCircle } from 'lucide-react'
import type { DirectReferralUser } from '../../types/types.ts'



const columnHelper = createColumnHelper<DirectReferralUser>();

const ReferralTable = () => {
    const { data: apiResponse, isLoading, isError } = useDirectReferrals();
    const [globalFilter, setGlobalFilter] = useState('');
    const [debouncedFilter, setDebouncedFilter] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilter(globalFilter);
        }, 300);

        return () => clearTimeout(handler);
    }, [globalFilter]);

    // Safely extract the raw referrals array from our envelope response structure
    const referralsData = useMemo(() => apiResponse?.data || [], [apiResponse]);

    // Define columns
    const columns = useMemo(() => [
        columnHelper.accessor('fullName', {
            header: 'User',
            cell: (info) => (
                <div className='flex flex-col'>
                    <span
                        className='font-semibold text-zinc-900 dark:text-zinc-100'
                        title={info.getValue()}
                    >
                        {info.getValue()}
                    </span>
                </div>
            ),
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (info) => (
                <a
                    href={`mailto:${info.getValue()}`}
                    target='_blank'
                    className='font-mono text-blue-500 dark:text-blue-400'
                    title={info.getValue()}
                >
                    {info.getValue()}
                </a>
            ),
        }),
        columnHelper.accessor('mobileNumber', {
            header: 'Mobile Number',
            cell: (info) => (
                <a
                    href={`tel:${info.getValue()}`}
                    target='_blank'
                    className='font-mono text-blue-500 dark:text-blue-400'
                    title={info.getValue()}
                >
                    {info.getValue()}
                </a>
            )
        }),
        columnHelper.accessor('accountStatus', {
            header: 'Status',
            cell: (info) => {
                const status = info.getValue();
                const isItemActive = status === 'Active';
                return (
                    <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        isItemActive 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                            : 'bg-zinc-500/10 border-zinc-500/20 text-zinc-500'
                        }`}
                        title={info.getValue()}
                    >
                        <span className={`size-1.5 rounded-full ${isItemActive ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                        {status}
                    </span>
                );
            },
        }),
        columnHelper.accessor('walletBalance', {
            header: 'Wallet Balance',
            cell: (info) => (
                <span
                    className='font-bold font-mono text-zinc-900 dark:text-zinc-50'
                    title={formatCurrency(info.getValue())}
                >
                    {formatCurrency(info.getValue())}
                </span>
            )
        }),
        columnHelper.accessor('createdAt', {
            header: 'Registration Date',
            cell: (info) => (
                <span
                    className='text-zinc-400'
                    title={format(info.getValue(), 'PPPPpppp')}
                >
                    {format(info.getValue(), 'PPp')}{' '}({formatDistanceToNow(new Date(info.getValue()), { addSuffix: true, includeSeconds: true })})
                </span>
            ),
        }),
    ], []);

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: referralsData,
        columns,
        state: { globalFilter: debouncedFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 5 } }
    });

    if (isLoading) {
        return (
            <div className='w-full space-y-3 animate-pulse'>
                <div className='h-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-64' />
                <div className='h-48 bg-zinc-100 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200/40 dark:border-zinc-800/80' />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='p-4 rounded-xl border border-red-200/60 bg-red-50/50 text-red-600 text-sm flex items-center gap-2'>
                <AlertCircle size={16} /> Direct network data stream loading fault.
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            {/* Filter Toolbelt Interface Section */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                    <UserCheck className='h-4 w-4 text-indigo-500' />
                    <h3 className='text-base font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight'>
                        Direct Referral Logs ({referralsData.length})
                    </h3>
                </div>
                <div className='relative max-w-xs w-full'>
                    <Search
                        className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400'
                        onClick={() => inputRef.current ? inputRef.current.focus() : null}
                    />
                    <input
                        type='text'
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        ref={inputRef}
                        placeholder='Search connections...'
                        className='w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-500 text-zinc-900 dark:text-zinc-100 transition-all'
                        title='Search connections...'
                    />
                </div>
            </div>

            {/* Core Data Layout Matrix Frame */}
            <div className='overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 backdrop-blur-sm shadow-sm'>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className='border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/70 dark:bg-zinc-950/40'>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} className='px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500'>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className='divide-y divide-zinc-100 dark:divide-zinc-800/50'>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className='hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-colors'>
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className='px-6 py-4 text-sm whitespace-nowrap'>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                              ) : (
                                <tr>
                                    <td colSpan={columns.length} className='px-6 py-12 text-center text-sm text-zinc-400'>
                                        No matching direct referral user logs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls Footer Strip */}
                {referralsData.length >= 0 && (
                    <div className='px-6 py-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between bg-zinc-50/30 dark:bg-zinc-950/10 text-xs text-zinc-500'>
                        <div className='flex items-center gap-1'>
                            <span>Page</span>
                            <strong className='font-bold text-zinc-700 dark:text-zinc-300'>
                                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </strong>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className='p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
                                title='Previous'
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className='p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
                                title='Next'
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReferralTable