import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react';

const CURRENCIES = ['$', '€', '₽', '¥', '₩', '£', '₡', '₾', '₺', '₸', '₪'];

const CurrencyTicker = () => {

    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % CURRENCIES.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className=' overflow-hidden inline-block relative align-bottom'>
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={CURRENCIES[index]}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'inline-block' }}
                >
                    {CURRENCIES[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    )
}

export default CurrencyTicker