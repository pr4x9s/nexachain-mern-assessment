import { lazy } from 'react'



const Login = lazy(() => import('./Login.tsx'));
const Register = lazy(() => import('./Register.tsx'));
const Home = lazy(() => import('./protected/Home.tsx'));
const Investments = lazy(() => import('./protected/Investments.tsx'));


export {
    Login,
    Register,
    Home,
    Investments,
}