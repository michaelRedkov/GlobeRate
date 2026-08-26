import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function formatDate(date: Date): string {
    return date.toISOString().split('T')[0]
}

function getStartDate(period: string): string {
    if (period === 'all') return '1999-01-04'
    const date = new Date()
    switch (period) {
        case 'year':
            date.setFullYear(date.getFullYear() - 1)
            break
        case 'month':
            date.setMonth(date.getMonth() - 1)
            break
        case 'week':
            date.setDate(date.getDate() - 7)
            break
        default:
            date.setDate(date.getDate() - 7)
    }
    return formatDate(date)
}

interface PeriodProps {
    date: string;
    base: string;
    quote: string;
    rate: number;
}

async function getPeriod(base: string, quote: string, period: string): Promise<PeriodProps> {
    const startDate = getStartDate(period)
    console.log(startDate)
    const response = await axios.get<any[]>(`https://api.frankfurter.dev/v2/rates?from=${startDate}&base=${base}&quotes=${quote}`, {
        timeout: 5000
    })

    return response.data
}


export const useGetPeriod = (base: string, quote: string, period: string) => {

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['period', base, quote, period],
        queryFn: () => getPeriod(base, quote, period),
        enabled: !!base && !!quote && base !== quote
    })

    return {
        data,
        isLoading,
        error
    }
}