import { NavLink } from 'react-router'
import { CircleDollarSign, Home, LineChart, type LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn.ts'


interface SidebarItemType {
	name: string;
	icon: LucideIcon;
	slug: string;
}

interface SidebarProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}


const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
	const menuItems: SidebarItemType[] = [
		{
			name: 'Overview',
			icon: Home,
			slug: '/dashboard/home',
		},
		{
			name: 'Investments',
			icon: LineChart,
			slug: '/dashboard/investments',
		},
		{
			name: 'Profit History',
			icon: CircleDollarSign,
			slug: '/dashboard/profit-history',
		},
	];

	const handleLinkClickClose = () => {
		if (window.innerWidth < 1024) {
			setIsOpen(false);
		}
	};

	return (
		<>
			{/* Backdrop Overlay Panel */}
			<div
				onClick={() => setIsOpen(false)}
				className={cn(
					'fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300',
					isOpen
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none',
				)}
			/>

			<aside
				className={cn(
					'top-16 h-[calc(100vh-64px)] overflow-y-auto bg-white dark:bg-zinc-950 transition-all duration-300 ease-in-out z-40 scrollbar-thin border-r border-zinc-200 dark:border-zinc-900',
					'fixed -left-full w-64 shadow-2xl',
					isOpen ? 'left-0' : '-left-full',
					'lg:sticky lg:left-0 lg:shadow-none lg:w-auto',
					isOpen ? 'lg:w-64' : 'lg:w-20',
				)}
			>
				<div className='flex flex-col gap-2 p-3'>
					{menuItems.map((item) => (
						<NavLink
							key={item.name}
							to={item.slug}
							end={item.slug === '/dashboard'}
							title={item.name}
							onClick={handleLinkClickClose}
							className={({ isActive }) =>
								cn(
									'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer',
									isActive
										? 'bg-blue-600/10 text-blue-600 font-bold'
										: 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900',
								)
							}
						>
							<item.icon
								size={20}
								className={cn(
									'shrink-0 transition-transform group-hover:scale-110',
									!isOpen && 'lg:mx-auto',
								)}
							/>
							<span
								className={cn(
									'whitespace-nowrap text-sm tracking-wide transition-all duration-300',
									isOpen
										? 'opacity-100 block'
										: 'opacity-0 hidden lg:hidden',
								)}
							>
								{item.name}
							</span>
						</NavLink>
					))}
				</div>
			</aside>
		</>
	)
}

export default Sidebar