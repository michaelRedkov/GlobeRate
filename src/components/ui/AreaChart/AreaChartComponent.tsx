import { AreaChart, Area, CartesianGrid, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useCurrencyStore } from "../../../stores/useCurrencyStore"
import { useGetPeriod } from "../../../api/useGetPeriod"
import { memo, useState } from "react"
import { useTheme } from "../../../app/useTheme"
import LoaderComp from "../Loader/Loader"

type Period = "week" | "month" | "year" | "all"

const PeriodSelector = memo(({ period, setPeriod }: { period: Period, setPeriod: (p: Period) => void }) => {

    const { isDark } = useTheme()

    return (
        <div>
            {(['all', 'year', 'month', 'week'] as Period[]).map((p) => (
                <button
                    key={p}
                    className={`btn
                        ${period === p ? "text-primary bg-linear-to-t border-t-2 border-muted" : "border-t-2 border-card"}
                        ${isDark ? ' bg-linear-to-t from-border to-muted border-t-2' : ''}
                        `}
                    onClick={() => setPeriod(p)}
                >
                    {p}
                </button>
            ))}
            {isDark && 'dark'}
        </div>
    )
})

const CustomTooltip = memo(({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="flex flex-col items-center w-32 p-2 border shadow-md 
            bg-card border-border">
                <p className="font-lighter">{label}</p>
                <p>
                    Rate: <span className="text-primary font-semibold">{payload[0].value}</span>
                </p>
            </div>
        )
    }

    return null
})

const AreaChartComponent = () => {

    const [period, setPeriod] = useState<Period>('week')

    const base = useCurrencyStore((state) => state.fromCurrency)
    const quote = useCurrencyStore((state) => state.toCurrency)

    const { data, isLoading } = useGetPeriod(base, quote, period)

    if (isLoading) {
        return (
            <LoaderComp/>
        )
    }

    return (

        <div className="flex flex-col bg-background mb-4 gap-2 border border-border rounded-2xl w-full p-2 shadow-sm">
            <div className=" bg-muted flex gap-1 border-b border-border p-1.5 rounded-t-lg inset-shadow-2xs">
                <PeriodSelector period={period} setPeriod={setPeriod} />
            </div>
            <div className="w-full h-50 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tick={{ fontSize: 12 }}
                        />

                        <Tooltip content={CustomTooltip as any} />

                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="rate"
                            stroke="var(--color-chart-1)"
                            fill="var(--color-chart-1-op50)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default AreaChartComponent