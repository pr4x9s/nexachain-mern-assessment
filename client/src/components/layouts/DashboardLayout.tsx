import { Link, Outlet } from 'react-router'

const DashboardLayout = () => {
  return (
    <>
        <div>DashboardLayout</div>
        <p>Links to navigate in dashboard</p>
        <Link to='home' className='underline me-2'>
            Welcome
        </Link>
        <Link to='investments' className='underline'>
            Investments
        </Link>
        <Outlet />
    </>
  )
}

export default DashboardLayout