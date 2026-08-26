import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { latestCurrency } from "../types/currencies";

async function getCurrency (code: string): Promise<latestCurrency[]> {

    const response = await axios.get<latestCurrency[]>(`https://api.frankfurter.dev/v2/rates?base=${code}`, {
        timeout: 5000,
    })

    return response.data
}

export const useGetCurrency = (code: string) => {
    
    const {
        data,
        isLoading,
        isFetching,
        error,
        refetch
    } = useQuery({
        queryKey: ['currency', code],
        queryFn: () => getCurrency(code),
        // enabled: code.trim().length === 3
    })
    
    return{
        data,
        isLoading: isLoading || isFetching,
        error,
        refetch,
    }
}