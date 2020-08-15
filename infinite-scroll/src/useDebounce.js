import {useEffect,useState} from 'react'

function useDebounce(searchTerm,delay) {
    const [debouncedValue,setdebouncedValue] = useState(searchTerm);
    useEffect(() =>{
        const handler = setTimeout(() =>{
            setdebouncedValue(searchTerm)
        },delay);

        return () =>{
            clearInterval(handler)
        }

    },[searchTerm])
    return debouncedValue
}

export default useDebounce
