import { Toaster } from 'sonner'

const App = () => {
	return (
    <div className='min-h-screen transition-colors duration-300 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white'>
      <Toaster richColors expand={false} duration={3000} />
    </div>
  )
}

export default App