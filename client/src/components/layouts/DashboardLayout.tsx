import { useState } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../layout/Navbar.tsx'
import Sidebar from '../layout/Sidebar.tsx'

const DashboardLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className='flex flex-col h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300'>
			{/* ONLY ONE NAVBAR HERE ON TOP */}
			<Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

			<div className='flex flex-1 overflow-hidden'>
				{/* ONLY ONE SIDEBAR HERE ON THE LEFT */}
				<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

				<main className='flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-900/40 scroll-smooth w-full p-2 md:p-4 lg:p-6'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default DashboardLayout