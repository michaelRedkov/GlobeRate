import CurrencyExchange from '../components/CurrencyExchange.tsx'
import AreaChartComponent from '../components/ui/AreaChart/AreaChartComponent.tsx'
import Title from '../components/ui/Title/Title.tsx'

function App() {
  return (
    <div className='flex justify-center items-center bg-muted w-screen min-h-screen overflow-auto'>
      <div className='flex flex-col justify-center gap-3 items-center w-full max-w-lg'>
        <Title />
        <CurrencyExchange />
        <AreaChartComponent />
      </div>
    </div>
  )
}

export default App