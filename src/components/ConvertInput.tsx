import { useEffect, useState } from "react"
import { useGetRate } from "../api/useGetRate"
import { useCurrencyStore } from "../stores/useCurrencyStore"

const ConvertInput = () => {

    const [base, setBase] = useState('')
    const [quote, setQuote] = useState('')
    const fromCurrency = useCurrencyStore((state) => state.fromCurrency)
    const toCurrency = useCurrencyStore((state) => state.toCurrency)
    const { data, isLoading, error } = useGetRate(fromCurrency, toCurrency)

    const rate = data?.rate

    const handleBaseChange = (val: string) => {
        setBase(val)
        if (!rate) return

        if (val === '') {
            setQuote('')
        } else {
            const num = parseFloat(val)
            setQuote(isNaN(num) ? '' : (num * rate).toFixed(2))
        }
    }

    const handleQuoteChange = (val: string) => {
        setQuote(val)
        if (!rate) return

        if (val === '') {
            setBase('')
        } else {
            const num = parseFloat(val)
            setBase(isNaN(num) ? '' : (num / rate).toFixed(2))
        }
    }

    useEffect(() => {
        if (rate && base !== '') {
            const num = parseFloat(base)
            setQuote(isNaN(num) ? '' : (num * rate).toFixed(2))
        }
    }, [rate])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Something went wrong</div>

    return (
        <div className="flex flex-col sm:flex-row gap-1 justify-between mt-4">
            <input
                placeholder="base"
                value={base}
                onChange={(e) => handleBaseChange(e.target.value)} 
                type="number"
                className=' border border-border rounded-md outline-none px-2' />
            <span className=" sm:block hidden">=</span>
            <input
                placeholder="quote"
                value={quote}
                onChange={(e) => handleQuoteChange(e.target.value)}
                type="number"
                className=' border border-border rounded-md outline-none px-2' />
        </div>
    )
}

export default ConvertInput