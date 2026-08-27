import { useGetCurrency } from '../api/useGetCurrency'
import { ArrowRightLeft, DatabaseX } from 'lucide-react'
import OptionsBlock from './ui/OptionBlock/OptionsBlock'
import { useCurrencyStore } from '../stores/useCurrencyStore'
import ConvertInput from './ConvertInput'
import { useCallback, useMemo } from 'react'

const CurrencyExchange = () => {

    const fromCurrency = useCurrencyStore((state) => state.fromCurrency)
    const toCurrency = useCurrencyStore((state) => state.toCurrency)
    const setFromCurrency = useCurrencyStore((state) => state.setFromCurrency)
    const setToCurrency = useCurrencyStore((state) => state.setToCurrency)

    const { data = [], isLoading, error } = useGetCurrency(fromCurrency)

    const targetCurrency = useMemo(() => {
        if (!data) return null
        return data.find(val => val.quote === toCurrency)
    }, [data, toCurrency])

    const handleSwap = useCallback(() => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }, [fromCurrency, toCurrency, setFromCurrency, setToCurrency])

    if (isLoading) return (
        <div className='flex justify-center items-center'>
            <h1 className='font-nano text-'>Loading currencies...</h1>
        </div>
    )

    if (error) return (
        <div>
            <DatabaseX />
        </div>
    )

    return (
        <div className='mx-auto gap-2 p-2 bg-background rounded-md
        border border-border shadow-sm text-muted-foreground'>
            <div className='grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr]'>
                <div className=' flex flex-col justify-center gap-2'>
                    <span className='text-center border-b border-border font-medium '>
                        From {fromCurrency}
                    </span>

                    <OptionsBlock data={data} direction='FROM' />
                </div>

                <div className='flex h-full justify-center items-center '>
                    <button
                        onClick={handleSwap}
                        className='flex justify-center btn bg-muted border border-border 
                        hover:bg-primary hover:text-green-400 hover:border-green-700
                        p-2 rounded-4xl w-full max-w-32 my-2'>
                        <ArrowRightLeft className=' rotate-90 sm:rotate-0' />
                    </button>
                </div>

                <div className=' flex flex-col gap-2'>
                    <span className='text-center border-b border-border font-medium text-muted-foreground text-sm'>
                        To {toCurrency}
                    </span>

                    <OptionsBlock data={data} direction='TO' />
                </div>
            </div>

            <ConvertInput />

            <div className="flex items-center justify-center text-sm font-semibold text-primary font p-1">
                <span className=' bg-yellow-400 text-black rounded-md mr-1 px-1'>Rate:</span>
                {targetCurrency ? `${targetCurrency.rate}` : 'not found'}
            </div>

        </div>
    )
}

export default CurrencyExchange