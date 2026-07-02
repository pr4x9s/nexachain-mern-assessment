import type { ReactNode } from 'react'
import { useAuthStore } from '../../store/authStore.ts'
import { Navigate, useLocation } from 'react-router'


interface AuthLayoutProps {
	children: ReactNode;
	authentication?: boolean;
}

const AuthLayout = ({ children, authentication = true }: AuthLayoutProps) => {
    
	const { isAuthenticated, isAuthInitialized } = useAuthStore();
	const location = useLocation();

	if (!isAuthInitialized) {
		return null;
	}

	// trying to access protected routes while unauthenticated
	if (authentication && !isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	// trying to access a public routes while authenticated
	else if (!authentication && isAuthenticated) {
		return <Navigate to='/dashboard' replace />;
	}

	return <>{children}</>;
};

export default AuthLayout