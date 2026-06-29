import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerUserSchema, type RegisterData } from '../validators/auth.validator.ts'
import { Link } from 'react-router'
import { AppWindow, Eye, EyeOff, Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegister } from '../hooks/useRegister.ts'



const Register = () => {
    const { mutate: registerUser, isPending } = useRegister();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
        resolver: zodResolver(registerUserSchema),
        mode: 'onTouched'
    });

    const onSubmit = (data: RegisterData) => {
        registerUser(data);
    };

    return (
        <>
            <title>Register | Nexachain AI</title>

            <section className='relative flex items-center justify-center min-h-screen p-4 bg-zinc-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-300'>

                <div className='w-full max-w-md p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl transition-all duration-300'>
                    
                    {/* header */}
                    <div className='text-center mb-8'>
                        <Link to='/' className='size-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all duration-300'>
                            <AppWindow className='text-white' size={28} />
                        </Link>
                        <h2 className='text-3xl font-extrabold tracking-tight bg-linear-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent'>
                            Register
                        </h2>
                        <p className='text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium'>
                            Join Nexachain AI
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                        {/* fullName */}
                        <div>
                            <label htmlFor='fullName' className='block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1'>
                                Full Name
                            </label>
                            <input
                                id='fullName'
                                type='text'
                                className={`w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border outline-none focus:ring-2 transition-all shadow-sm text-sm
                                    ${errors.fullName 
                                        ? 'border-red-500/50 focus:ring-red-500 dark:bg-red-950/10' 
                                        : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'}`}
                                placeholder='Your Name'
                                {...register('fullName')}
                            />
                            {errors.fullName && (
                                <p className='text-red-500 text-xs font-medium mt-1.5 ml-1'>
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>
                        
                        {/* email */}
                        <div>
                            <label htmlFor='email' className='block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1'>
                                Email Address
                            </label>
                            <input
                                id='email'
                                type='email'
                                className={`w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border outline-none focus:ring-2 transition-all shadow-sm text-sm
                                    ${errors.email 
                                        ? 'border-red-500/50 focus:ring-red-500 dark:bg-red-950/10' 
                                        : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'}`}
                                placeholder='name@company.com'
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className='text-red-500 text-xs font-medium mt-1.5 ml-1'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* mobileNumber */}
                        <div>
                            <label htmlFor='mobileNumber' className='block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1'>
                                Mobile Number
                            </label>
                            <input
                                id='mobileNumber'
                                type='text'
                                className={`w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border outline-none focus:ring-2 transition-all shadow-sm text-sm
                                    ${errors.mobileNumber 
                                        ? 'border-red-500/50 focus:ring-red-500 dark:bg-red-950/10' 
                                        : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'}`}
                                placeholder='+91XXXXXXXXXX'
                                {...register('mobileNumber')}
                            />
                            {errors.mobileNumber && (
                                <p className='text-red-500 text-xs font-medium mt-1.5 ml-1'>
                                    {errors.mobileNumber.message}
                                </p>
                            )}
                        </div>

                        {/* referralCode */}
                        <div>
                            <label htmlFor='referralCodeUsed' className='block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1'>
                                Referral Code (Optional)
                            </label>
                            <input
                                id='referralCodeUsed'
                                type='text'
                                className={`w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border outline-none focus:ring-2 transition-all shadow-sm text-sm
                                    ${errors.referralCodeUsed 
                                        ? 'border-red-500/50 focus:ring-red-500 dark:bg-red-950/10' 
                                        : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'}`}
                                placeholder='ABC6YZ'
                                {...register('referralCodeUsed')}
                            />
                            {errors.referralCodeUsed && (
                                <p className='text-red-500 text-xs font-medium mt-1.5 ml-1'>
                                    {errors.referralCodeUsed.message}
                                </p>
                            )}
                        </div>

                        {/* password */}
                        <div>
                            <label htmlFor='password' className='block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1'>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    className={`w-full p-3 pr-11 rounded-xl bg-zinc-50 dark:bg-zinc-950 border outline-none focus:ring-2 transition-all shadow-sm text-sm
                                        ${errors.password 
                                            ? 'border-red-500/50 focus:ring-red-500 dark:bg-red-950/10' 
                                            : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'}`}
                                    placeholder='••••••••'
                                    {...register('password')}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors'
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className='text-red-500 text-xs font-medium mt-1.5 ml-1'>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* confirmPassword */}
                        <div>
                            <label htmlFor='confirmPassword' className='block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1'>
                                Confirm Password
                            </label>
                            <div className='relative'>
                                <input
                                    id='confirmPassword'
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className={`w-full p-3 pr-11 rounded-xl bg-zinc-50 dark:bg-zinc-950 border outline-none focus:ring-2 transition-all shadow-sm text-sm
                                        ${errors.confirmPassword 
                                            ? 'border-red-500/50 focus:ring-red-500 dark:bg-red-950/10' 
                                            : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'}`}
                                    placeholder='••••••••'
                                    {...register('confirmPassword')}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors'
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className='text-red-500 text-xs font-medium mt-1.5 ml-1'>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* submission */}
                        <button
                            type='submit'
                            disabled={isPending}
                            className='w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer'
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className='animate-spin' size={18} />
                                    <span>Registering...</span>
                                </>
                            ) : (
                                'Register'
                            )}
                        </button>
                    </form>

                    {/* footer nav links */}
                    <div className='mt-8 pt-5 border-t border-zinc-200 dark:border-zinc-800 text-center'>
                        <p className='text-sm text-zinc-500 dark:text-zinc-400 font-medium'>
                            Already have an account?{' '}
                            <Link to='/login' className='text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold hover:underline transition-colors ml-1'>
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register