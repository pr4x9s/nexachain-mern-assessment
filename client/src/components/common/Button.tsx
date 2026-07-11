import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react'


type CommonProps = {
    children: ReactNode,
    className?: string;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
    children,
    type = 'button',
    className = '',
    ...props
}: ButtonProps) => {

    const baseClasses = 'w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl transition-all active:scale-[0.99] disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer';

    const hoverClasses = 'hover:from-blue-500 hover:to-indigo-500';

    const finalClass = clsx(baseClasses, hoverClasses, className);


	return (
        <button
            type={type}
            className={finalClass}
            {...props as ButtonHTMLAttributes<HTMLButtonElement>}
        >
            {children}
        </button>
    )
}

export default Button