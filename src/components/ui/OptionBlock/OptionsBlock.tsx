import { memo, useCallback, useMemo, useState } from "react";
import { useCurrencyStore } from "../../../stores/useCurrencyStore";
import type { latestCurrency } from "../../../types/currencies";

type OptionsBlockProps = {
    data: latestCurrency[];
    direction: 'TO' | 'FROM'
}

const OptionsBlock = ({ data = [], direction }: OptionsBlockProps) => {

    const [searchQuery, setSearchQuery] = useState('')

    const setFromCurrency = useCurrencyStore((state) => state.setFromCurrency)
    const setToCurrency = useCurrencyStore((state) => state.setToCurrency)

    const currentCode = useCurrencyStore((state) => 
        direction === 'FROM' ? state.fromCurrency : state.toCurrency
    )

    const handleClick = useCallback((code: string) => {
        if (direction === 'FROM') {
            setFromCurrency(code)
        } else {
            setToCurrency(code)
        }
    }, [direction, setFromCurrency, setToCurrency])

    const filteredData = useMemo(() => {
        const query = searchQuery.toLocaleLowerCase().trim()
        if (!query) return data;

        return data.filter((val) => {
            const code = val.quote?.toLocaleLowerCase() || ''
            return code.includes(query)
        })
    }, [data, searchQuery])

    return (
        <div className='bg-muted w-fit flex flex-col md:p-2 p-1 gap-2 rounded-2xl shadow-sm'>

            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" border border-border outline-none rounded-4xl 
                inset-shadow-sm px-2 text focus:border-ring"
                placeholder="Search code..."
            />

            <ul className="overflow-auto md:h-44 h-22 md:scrollbar-thin scrollbar-thumb-border inset-shadow-2xs scrollbar-none">
                {filteredData.map((val) => {
                    const itemCode = val.quote;
                    const isActive = currentCode === itemCode
                    const countryCode = itemCode ? itemCode.toLowerCase().slice(0, 2) : ''
                    return (
                        <li
                            key={itemCode}
                            className={`currencyOption ${isActive ? 'active' : ''}`}
                            onClick={() => handleClick(itemCode)}
                        >
                            <span className={`fi fi-${countryCode} fis flag`}></span>
                            {itemCode?.slice(0, 3)}
                        </li>
                    )
                })}

                {filteredData.length === 0 && (
                    <li className="p-2 text-center text-sm text-muted-foreground">
                        No currencies found
                    </li>
                )}
            </ul>
        </div>
    )
}

export default memo(OptionsBlock)