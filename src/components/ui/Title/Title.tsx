import { Globe } from "lucide-react"
import { useTheme } from "../../../app/useTheme"
import CurrencyTicker from "../CurrencyTicker/CurrencyTicker"

const Title = () => {

  const { toggleTheme } = useTheme()

  return (
    <h1
      className='flex items-center  mt-10 relative 
        text-4xl font-mono text-primary cursor-pointer'
      onClick={toggleTheme}
    >
      <span className=' opacity-0 text-3xl'>
        --------
      </span>
      <CurrencyTicker />
      <span className='flex items-center absolute -top-6 left-1/2 -translate-x-18
        font-extrabold text-shadow-md gradient-text'>
        Gl<Globe className='text-primary rotate-8' />be
      </span>

      <span className='flex absolute left-1/2 -translate-x-8  text-3xl text-shadow-md gradient-text'>
        Rates
      </span>
    </h1>
  )
}

export default Title