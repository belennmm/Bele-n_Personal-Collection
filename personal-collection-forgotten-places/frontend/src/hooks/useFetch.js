/**
 * Este es el hook que maneja las peticiones a la API. Hace la petición, maneja el estado de carga y errores, y muestra los datos
 * Recibe la petición HTTP con el URL, las  opciones de la petición y un booleano para activar o desactivar la petición. 
 * @param {string} url es la URL a la que se realizará la petición.
 * @param {object} options son las opciones para fetch, como el method, headers o el body
 * @param {boolean} activo este dice si la petición debe ejecutarse
 * @returns {{data: *, loading: boolean, error: string|null}} devuelve los datos, estado de carga y un mensaje de error cuando aplica
 */

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