import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getRate(base: string, quote: string): Promise<any> {
    const API = "https://api.frankfurter.dev";
    const response = await axios.get<any[]>(`${API}/v2/rate/${base}/${quote}`, {
        timeout: 5000
    })

    return response.data
}

export const useGetRate = (base: string, quote: string) => {

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['rate', base, quote],
        queryFn: () => getRate(base, quote),
        enabled: base !== quote
    })

    return {
        data,
        isLoading,
        error
    }
}