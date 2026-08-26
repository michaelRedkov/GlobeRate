import { create } from 'zustand'

type CurrencyState = {
    fromCurrency: string
    toCurrency: string
    setFromCurrency: (code: string) => void
    setToCurrency: (code: string) => void
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
    fromCurrency: "USD",
    toCurrency: "JPY",
    setFromCurrency: (code) => set({fromCurrency: code}),
    setToCurrency: (code) => set({toCurrency: code})
}))