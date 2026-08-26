import { Loader } from "lucide-react"

const LoaderComp = () => {
    return (
        <div className='flex justify-center items-center animate-spin m-5 text-muted-foreground'>
            <Loader/>
        </div>
    )
}

export default LoaderComp