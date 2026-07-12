import { useForm, useWatch } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { zodResolver } from '@hookform/resolvers/zod'
import { IndianRupee, Loader2 } from 'lucide-react'
import { createInvestmentUserSchema, type CreateInvestmentData } from '../../validators/investment.validator.ts'
import { useCreateInvestment } from '../../hooks/useInvestments.ts'
import { formatCurrency } from '../../utils/format.ts'
import Button from '../common/Button.tsx'
import Input from '../common/Input.tsx'



const CreateInvestment = () => {

    const { mutate: createInvestment, isPending } = useCreateInvestment();

    const { register, handleSubmit, reset, control, watch, setValue, setFocus, formState: { errors } } = useForm<CreateInvestmentData>({
        resolver: zodResolver(createInvestmentUserSchema),
        mode: 'onTouched',
    });

    useFormPersist('investment_form_data', { watch, setValue });

    const watchedAmount = useWatch({ control, name: 'investmentAmount' });

    const onSubmit = (data: CreateInvestmentData) => {
        createInvestment(data, {
            onSuccess: () => {
                reset();
                sessionStorage.clear();
            },
        });
    };

    return (
        <div className='max-w-2xl mx-auto py-2 transition-all duration-300'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5' noValidate>

                <div>
                    <Input 
                        label='Investment Capital (₹)'
                        type='number'
                        title='Investment Capital (₹)'
                        min={1}
                        disabled={isPending}
                        placeholder='e.g. 500'
                        leftIcon={
                            <IndianRupee 
                                className='size-4 cursor-pointer'
                                onClick={() => setFocus('investmentAmount')}
                            />
                        }
                        error={errors.investmentAmount?.message}
                        {...register('investmentAmount', { valueAsNumber: true })}
                    />
                    {watchedAmount > 0 && !isNaN(watchedAmount) && (
                        <span className='text-xs font-bold text-blue-600 dark:text-blue-400 mt-2 ml-1 break-all whitespace-normal leading-relaxed max-w-full'>
                            Value: {formatCurrency(watchedAmount)}
                        </span>
                    )}
                </div>


                <div>
                    <label 
                        htmlFor='planDetails' 
                        className='block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1'
                    >
                        Investment Plan Details
                    </label>
                    <textarea
                        id='planDetails'
                        disabled={isPending}
                        rows={4}
                        placeholder='Specify investment plan targets and strategy allocation rules...'
                        className={`w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border outline-none focus:ring-2 transition-all shadow-sm text-sm resize-none leading-relaxed disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:dark:bg-zinc-900
                            ${errors.planDetails 
                                ? 'border-red-500/50 focus:ring-red-500 hover:border-red-500 dark:bg-red-950/10' 
                                : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500 hover:border-blue-400'}`}
                        {...register('planDetails')}
                    />
                    {errors.planDetails && (
                        <p className='text-red-500 text-xs font-medium mt-1.5 ml-1'>
                            {errors.planDetails.message}
                        </p>
                    )}
                </div>
                
                <Button
                    type='submit'
                    disabled={isPending}
                    title={isPending ? 'Activating Investment...' : 'Activate Investment'}
                >
                    {isPending ? (
                        <>
                            <Loader2 className='animate-spin' size={18} />
                            <span>Activating Investment...</span>
                        </>
                    ) : (
                        'Activate Investment'
                    )}
                </Button>
            </form>
        </div>
    )
}

export default CreateInvestment