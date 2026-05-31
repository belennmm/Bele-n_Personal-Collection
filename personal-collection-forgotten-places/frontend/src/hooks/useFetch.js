import { useState,  useEffect} from "react";

function useFetch( url, options = { } , activo =true){

  const [data, setData] = useState(null) ;
  const [ loading , setLoading] = useState( false);
  const [error, setError] = useState(null);

  useEffect( () => {
    if(!activo || !url){ return ;}

    const controller = new AbortController( ) ;

    async function cargarData(){

        setLoading(true);
        setError(null);
        
        try {
            const res = await fetch(url , {
                ...options,
                signal: controller.signal
            }) ;
            
            if( !res.ok){ throw new Error(`HTTP ${res.status}` ) ; }
            
            const json = await res.json() ;
            
            setData(json) ;
        }
        
        catch(errorActual){
            if( errorActual.name !== "AbortError" ){ setError(errorActual.message) ; }
        }
        
        finally {setLoading ( false);}
    }
    
    cargarData();
    
    return () => {controller.abort() ;};

} , [url , activo ]);

return { data, loading, error } ;
}

export default useFetch ;