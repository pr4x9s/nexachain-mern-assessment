import AnalyticsChart from '../../components/dashboard/AnalyticsChart.tsx'
import ReferralTable from '../../components/dashboard/ReferralTable.tsx'
import ReferralTree from '../../components/dashboard/ReferralTree.tsx'
import StatCards from '../../components/dashboard/StatCards.tsx'


const Home = () => {
  return (
    <>
        <title>Overview | Nexachain AI</title>

        <div className='space-y-6 max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8'>

            <div>
                <h1 className='text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight'>
                    Account Overview
                </h1>
                <p className='text-xs text-zinc-500 mt-0.5'>
                    Real-time network asset parameters, investment distribution trackers, and multi-level node layers.
                </p>
            </div>

            <StatCards />

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'>
                <AnalyticsChart />
                <ReferralTree />
            </div>
            
            <ReferralTable />
        </div>
    </>
  )
}

export default Home