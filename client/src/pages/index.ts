import { lazy } from 'react'



const Login = lazy(() => import('./Login.tsx'));
const Register = lazy(() => import('./Register.tsx'));


export {
    Login,
    Register
}