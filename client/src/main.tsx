import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import AuthLayout from './components/layouts/AuthLayout.tsx'
import { Suspense } from 'react'
import DashboardLayout from './components/layouts/DashboardLayout.tsx'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { Home, Investments, Login, ProfitHistory, Register } from './pages/index.ts'



const queryClient = new QueryClient();

// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient
  }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to='/login' replace />
      },
      {
        path: 'login',
        element: (
          <AuthLayout authentication={false}>
            <Suspense>
              <Login />
            </Suspense>
          </AuthLayout>
        )
      },
      {
        path: 'register',
        element: (
          <AuthLayout authentication={false}>
            <Suspense>
              <Register />
            </Suspense>
          </AuthLayout>
        )
      },

      // protected routes
      {
        path: 'dashboard',
        element: (
          <AuthLayout authentication>
            <DashboardLayout />
          </AuthLayout>
        ),
        children: [
          {
            index: true,
            element: <Navigate to='home' replace />
          },
          {
            path: 'home',
            element: (
              <Suspense>
                <Home />
              </Suspense>
            )
          },
          {
            path: 'investments',
            element: (
              <Suspense>
                <Investments />
              </Suspense>
            )
          },
          {
            path: 'profit-history',
            element: (
              <Suspense>
                <ProfitHistory />
              </Suspense>
            )
          },
        ]
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
)
