import { useEffect, useMemo, useRef, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useGetReferralIncomeHistory } from '../../hooks/useDashboardData.ts'
import { formatCurrency } from '../../utils/format.ts'
import { format, formatDistanceToNow } from 'date-fns'
import { Search, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import type { ReferralIncomeItem } from '../../types/types.ts'


const columnHelper = createColumnHelper<ReferralIncomeItem>();


const ReferralIncomeList = () => {

	const [globalFilter, setGlobalFilter] = useState('');
	const [debouncedFilter, setDebouncedFilter] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedFilter(globalFilter);
		}, 300);

		return () => clearTimeout(handler);
	}, [globalFilter]);

	const { data: apiResponse, isLoading, isError } = useGetReferralIncomeHistory();

	const levelIncomeData = useMemo(() => apiResponse?.data || [], [apiResponse]);

	const columns = useMemo(
		() => [
			columnHelper.accessor('userWhoGenerated.fullName', {
				header: 'Ref. User',
				cell: (info) => (
					<div className='flex flex-col'>
						<span
							className='font-semibold text-zinc-900 dark:text-zinc-100'
							title={info.getValue()}
						>
							{info.getValue() || 'System Baseline Account'}
						</span>
						<a
							href={`mailto:${info.row.original.userWhoGenerated.email}`}
							target='_blank'
							className='text-[10px] text-blue-500 dark:text-blue-400 font-mono mt-0.5 hover:underline'
						>
							{info.row.original.userWhoGenerated.email}
						</a>
					</div>
				),
			}),
			columnHelper.accessor('referralLevel', {
				header: 'Referral Level',
				cell: (info) => {
					const level = info.getValue();
					return (
						<span
							className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono tracking-wide'
							title={`Level ${level}`}
						>
							Lvl {level}
						</span>
					);
				},
			}),
			columnHelper.accessor('incomeAmount', {
				header: 'Income Earned',
				cell: (info) => (
					<span
						className='font-bold font-mono text-emerald-600 dark:text-emerald-400'
						title={formatCurrency(info.getValue())}
					>
						+{formatCurrency(info.getValue())}
					</span>
				),
			}),
			columnHelper.accessor('createdAt', {
				header: 'Date Received',
				cell: (info) => (
					<div
						className='flex flex-col text-xs text-zinc-500 dark:text-zinc-400 font-medium'
						title={format(new Date(info.getValue()), 'PPPPpppp')}
					>
						<span>{format(new Date(info.getValue()), 'PP')}</span>
						<span className='text-[10px] text-zinc-400 font-normal mt-0.5'>
							(
							{formatDistanceToNow(new Date(info.getValue()), {
								addSuffix: true,
								includeSeconds: true,
							})}
							)
						</span>
					</div>
				),
			}),
		],
		[],
	);

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data: levelIncomeData,
		columns,
		state: { globalFilter: debouncedFilter },
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: { pagination: { pageSize: 5 } },
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
				<AlertCircle size={16} /> Multi-level affiliate commission data stream compilation fault.
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none pb-1'>
				<div>
					<h3 className='text-sm font-semibold text-zinc-900 dark:text-zinc-50'>
						Referral Income Records
					</h3>
					<p className='text-[11px] text-zinc-400 mt-0.5'>
						Track your history of network commissions earned from downline registrations.
					</p>
				</div>
				<div className='relative max-w-xs w-full'>
					<Search
						className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400'
						onClick={() =>inputRef.current ? inputRef.current.focus() : null}
					/>
					<input
						type='text'
						value={globalFilter ?? ''}
						onChange={(e) => setGlobalFilter(e.target.value)}
						ref={inputRef}
						placeholder='Search users or email configurations...'
						className='w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-500 text-zinc-900 dark:text-zinc-100 transition-all'
						title='Search users or email configurations...'
					/>
				</div>
			</div>

			{/* Layout Table */}
			<div className='overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 backdrop-blur-sm shadow-sm'>
				<div className='overflow-x-auto'>
					<table className='w-full text-left border-collapse'>
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr
									key={headerGroup.id}
									className='border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/70 dark:bg-zinc-950/40'
								>
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											className='px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500'
										>
											{header.isPlaceholder
												? null
												: flexRender(
                                                    header.column.columnDef.header,
													header.getContext(),
                                                )
                                            }
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody className='divide-y divide-zinc-100 dark:divide-zinc-800/50'>
							{table.getRowModel().rows.length > 0 ? (
								table.getRowModel().rows.map((row) => (
									<tr
										key={row.id}
										className='hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-colors group'
									>
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className='px-6 py-4 text-sm whitespace-nowrap'
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</td>
										))}
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={columns.length}
										className='px-6 py-12 text-center text-sm text-zinc-400'
									>
										No multi-level structural affiliate profit distributions found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Grid Pagination Footer Bar */}
				{levelIncomeData.length >= 0 && (
					<div className='px-6 py-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between bg-zinc-50/30 dark:bg-zinc-950/10 text-xs text-zinc-500'>
						<div className='flex items-center gap-1'>
							<span>Page</span>
							<strong className='font-bold text-zinc-700 dark:text-zinc-300'>
								{table.getState().pagination.pageIndex + 1} of{' '}
								{table.getPageCount()}
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

export default ReferralIncomeList