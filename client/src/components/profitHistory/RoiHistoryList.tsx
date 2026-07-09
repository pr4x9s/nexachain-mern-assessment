import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useGetRoiHistory } from '../../hooks/useInvestments.ts'
import { formatCurrency } from '../../utils/format.ts'
import { format, formatDistanceToNow } from 'date-fns'
import { Search, ChevronLeft, ChevronRight, AlertCircle, Layers, Activity, CheckCircle2, XCircle } from 'lucide-react'
import type { RoiHistoryItem, TabItems } from '../../types/types.ts'


type FilterStatusTabs = RoiHistoryItem['status'] | 'All';

const columnHelper = createColumnHelper<RoiHistoryItem>();


const RoiHistoryList = () => {

	const [globalFilter, setGlobalFilter] = useState('');
	const [debouncedFilter, setDebouncedFilter] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
	const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilter(globalFilter);
        }, 300);

        return () => clearTimeout(handler);
    }, [globalFilter]);

	const validStatuses: FilterStatusTabs[] = ['All', 'Processed', 'Pending', 'Failed'];
	const statusParam = searchParams.get('status') as FilterStatusTabs;
	const currentStatus = validStatuses.includes(statusParam)? statusParam: 'All';

	const { data: apiResponse, isLoading, isError } = useGetRoiHistory();

	const roiHistoryData = useMemo(() => apiResponse?.data || [], [apiResponse]);

	const handleStatusChange = (statusTabName: FilterStatusTabs) => {
		setSearchParams((prev) => {
			prev.set('status', statusTabName);
			return prev;
		});
	};

	const tabItems: TabItems<FilterStatusTabs> = [
		{
			id: 'All',
			name: 'All Logs',
			icon: Layers,
		},
		{
			id: 'Processed',
			name: 'Processed',
			icon: CheckCircle2,
		},
		{
			id: 'Pending',
			name: 'Pending',
			icon: Activity,
		},
		{
			id: 'Failed',
			name: 'Failed',
			icon: XCircle,
		},
	];

	const getStatusStyle = (status: RoiHistoryItem['status']) => {
		switch (status) {
			case 'Processed':
				return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400';
			case 'Pending':
				return 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400';
			case 'Failed':
				return 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400';
		}
	};

	const columns = useMemo(
		() => [
			columnHelper.accessor('investmentReference.planDetails', {
				header: 'Investment Allocation Details',
				cell: (info) => (
					<div className='flex flex-col max-w-xs sm:max-w-sm md:max-w-md'>
						<span
							className='font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:line-clamp-none transition-all duration-300 wrap-break-word'
							title={info.getValue()}
						>
							{info.getValue() || 'N/A'}
						</span>
						<span className='text-[10px] text-zinc-400 mt-1 font-mono'>
							ID:{' '}
							{info.row.original.investmentReference?._id ||
								'N/A'}
						</span>
					</div>
				),
			}),
			columnHelper.accessor('investmentReference.investmentAmount', {
				header: 'Capital Invested',
				cell: (info) => {
					const amount = info.getValue();
					return (
						<span
							className='font-bold font-mono text-zinc-900 dark:text-zinc-50'
							title={amount ? formatCurrency(amount) : '0'}
						>
							{amount ? formatCurrency(amount) : '—'}
						</span>
					);
				},
			}),
			columnHelper.accessor('roiAmount', {
				header: 'ROI Received',
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
						<span>{format(info.getValue(), 'PP')}</span>
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
			columnHelper.accessor('status', {
				header: 'Status',
				cell: (info) => {
					const status = info.getValue();
					return (
						<span
							className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(status)}`}
							title={status}
						>
							<span
								className={`size-1.5 rounded-full ${status === 'Processed' ? 'bg-emerald-500' : status === 'Pending' ? 'bg-blue-500' : 'bg-red-400'}`}
							/>
							{status}
						</span>
					);
				},
			}),
		],
		[],
	);

	// Derived filtering state generated directly from url tracking variables
	const tableFilters = useMemo(() => {
		const filters = [];

		if (currentStatus !== 'All') {
			filters.push({ id: 'status', value: currentStatus });
		}

		return filters;
	}, [currentStatus]);
    
	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data: roiHistoryData,
		columns,
		state: {
            globalFilter: debouncedFilter,
			columnFilters: tableFilters,
		},
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
				<AlertCircle size={16} /> Runtime ROI distributed ledger data stream loading fault.
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			<div className='flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/30 pb-2 select-none'>
				<div className='flex gap-2 overflow-x-auto scrollbar-none'>
					{tabItems.map((tab) => {
						const isSelected = currentStatus === tab.id;
						return (
							<button
								key={tab.id}
								type='button'
								onClick={() => handleStatusChange(tab.id)}
								className={`py-1.5 px-3 text-xs font-semibold rounded-lg flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
									isSelected
										? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
										: 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
								}`}
								title={tab.name}
							>
								<tab.icon size={14} />
								<span>{tab.name}</span>
							</button>
						);
					})}
				</div>

				<div className='relative max-w-xs w-full ml-auto xl:ml-0'>
					<Search
						className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400'
						onClick={() => inputRef.current ? inputRef.current.focus() : null}
					/>
					<input
						type='text'
						value={globalFilter ?? ''}
						onChange={(e) => setGlobalFilter(e.target.value)}
						ref={inputRef}
						placeholder='Search plans...'
						className='w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-500 text-zinc-900 dark:text-zinc-100 transition-all'
						title='Search plans...'
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
										No matching logs found for this status.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Grid Pagination Footer Bar */}
				{roiHistoryData.length >= 0 && (
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

export default RoiHistoryList