import { useEffect ,useState} from 'react'


function useBookSearch(query,pageNumber) {
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [books,setBooks] = useState([]);
    const [hasMore,sethasMore] = useState(false);
    const fetchData = async() =>{
        setLoading(true);
        setError(false);
        const params = new URLSearchParams({
            q:query,
            page:pageNumber
        })
        const url = `http://openlibrary.org/search.json?${params.toString()}`
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    useEffect(() =>{
        setBooks([])
    },[query])
    useEffect(() =>{
        // (async() =>{
        // //  const {docs} =  await fetchData() ;
        // const data = await fetchData() 
        // //  docs.map(({title_suggest}) => console.log(title_suggest))
        // console.log(data)
         
        // })()

        fetchData().then(data =>{
            console.log(data.docs)
            setBooks(prevBooks =>{
                return [...new Set([...prevBooks,...data.docs.map(book => book.title)])]
            });
            sethasMore(data.docs.length > 0);
            setLoading(false)
        }).catch(error =>{
            setError(true)
        })
        
        

    },[query,pageNumber])
    return {loading,error,books,hasMore};
}

export default useBookSearch
