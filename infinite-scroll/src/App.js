import React,{useState,useRef,useCallback} from 'react';
import useBookSearch from './useBookSearch';
import useDebounce from './useDebounce';
import './App.css';

function App() {
  const [query,setQuery] = useState('');
  const [page,setPage] = useState(1);
  const Observer = useRef();
  
  const handleQuery = (e) =>{
    setQuery(e.target.value);
    setPage(1);
  };
  const debouncedQuery = useDebounce(query,500)
  const {loading,error,books,hasMore} = useBookSearch(debouncedQuery,page);
  const LastBookElementRef = useCallback(node =>{
    if(loading) return;
    if(Observer.current) Observer.current.disconnect();
    Observer.current = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting && hasMore){
        // console.log('entries*******',entries[0])
        // console.log('Visible');
        setPage(prevPage => prevPage +1)
      }
    })
    if(node) Observer.current.observe(node)
    //  console.log('current observer********',Observer.current)
  },[loading,hasMore]);
  return (
    <>
      <input type='text' placeholder='search' value={query} onChange={handleQuery}/>
      {
        books.map((book,index) =>{
                if(books.length === index+1){
                  return <div ref={LastBookElementRef} key={book}> {book}</div>
                }else{
                  return <div key={book}> {book}</div>
                }
            }
          )
        }
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error..'}</div>
     
    </>
  );
}

export default App;
