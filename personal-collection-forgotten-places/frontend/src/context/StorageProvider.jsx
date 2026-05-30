import { useState, useCallback } from "react" ;
import { StorageContext } from "./StorageContext" ;

function StorageProvider({ children }){

  const [ modo , setModoState ] = useState(() => { return localStorage.getItem("modo")  || "local" ; }) ;

  const [ cargando , setCargando ] = useState(false) ;
  const [error , setError ] = useState(null) ;

  const API_URL = import.meta.env.VITE_API_URL  || "http://localhost:3001" ;
  

  function setModo(nuevoModo){
    setModoState(nuevoModo) ;
    localStorage.setItem("modo" , nuevoModo) ;
  }


  const obtenerItems = useCallback(async () => { 
    
    setCargando(true) ;
    setError(null) ;

    try {
      if(modo === "api"){
        const res = await fetch(`${API_URL}/api/items`) ;

        if(!res.ok){ throw new Error(`HTTP ${res.status}`) ; }

        return await res.json() ;
      }

      const data = localStorage.getItem( "items") ;

      return data ? JSON.parse(data) : [] ;

    }

    catch(errorActual){ setError(errorActual.message) ; return [] ; }


    finally {
      setCargando(false) ;
    }

  } , [modo , API_URL]) ;

  const guardarItem = useCallback(async (item) => {
    setCargando(true) ;
    setError(null) ;

    try {
      
        if(modo === "api"){
        const res = await fetch( `${API_URL}/api/items` , {
          method: "POST" ,

          headers: { "Content-Type": "application/json" } ,
          body: JSON.stringify(item)

        }) ;

        if(!res.ok){
          throw new Error(`HTTP ${res.status}`) ;
        }

        return await res.json() ;
      }

      const data = localStorage.getItem("items") ;

      const itemsActuales = data ? JSON.parse(data) : [] ;
      const nuevaLista  = [...itemsActuales , item] ;

      localStorage.setItem("items" , JSON.stringify(nuevaLista)) ;

      return item ;

    }

    catch(errorActual){ setError(errorActual.message) ;
      return null ; }

    finally { setCargando(false) ; }

  } , [modo , API_URL]) ;

  const actualizarItem = useCallback(async (id , itemUpdated) => {
    setCargando(true) ;
    setError(null) ;

    try {
      if(modo === "api"){
        const res = await fetch(`${API_URL}/api/items/${id}` , {
          method: "PUT" ,
          headers: { "Content-Type": "application/json" } ,
          body: JSON.stringify(itemUpdated)
        }) ;

        if(!res.ok){ throw new Error(`HTTP ${res.status}`) ; }

        return await res.json() ;
      }

      const data = localStorage.getItem("items") ;
      const itemsActuales = data ? JSON.parse(data) : [] ;

      const nuevaLista = itemsActuales.map((item) => item.id === id ? { ...item , ...itemUpdated } : item ) ;

      localStorage.setItem("items" , JSON.stringify(nuevaLista)) ;

      return itemUpdated ;

    }

    catch(errorActual){
      setError(errorActual.message) ; return null ;
    }

    finally {
      setCargando(false) ;
    }

  } , [modo , API_URL]) ;

  const eliminarItem = useCallback(async (id) => {
    setCargando(true) ;
    setError(null) ;

    try {
      
        if(modo === "api"){
        const res = await fetch(`${API_URL}/api/items/${id}` , {
          method: "DELETE"
        }) ;

        if(!res.ok){ throw new Error(`HTTP ${res.status}`) ; }

        return true ;
      }

      const data = localStorage.getItem("items") ;
      const itemsActuales = data ? JSON.parse(data) : [] ;

      const nuevaLista = itemsActuales.map((item) => item.id === id ? { ...item , activo: false } : item ) ;

      localStorage.setItem("items" , JSON.stringify(nuevaLista)) ;

      return true ;
    }

    catch(errorActual){
      setError(errorActual.message) ;
      return false ;
    }

    finally {setCargando(false)  ;}

  } , [modo , API_URL]) ;

    const registrarActividad = useCallback(async (itemId , registro , fechaActividad) => {
    setCargando(true) ;
    setError(null) ;

    try {
      if(modo === "api"){
        const res = await fetch(`${API_URL}/api/items/${itemId}/registro` , {
          method: "POST" ,
          headers: { "Content-Type": "application/json" } ,
          body: JSON.stringify(registro)
        }) ;

        if(!res.ok){
          throw new Error(`HTTP ${res.status}`) ;
        }

        return await res.json() ;
      }

      const data = localStorage.getItem("items") ;
      const itemsActuales = data ? JSON.parse(data) : [] ;

      const nuevaLista = itemsActuales.map((item) =>
        item.id === itemId ? {
          ...item ,
          fechaActividad ,
          registros: [...(item.registros || []) , registro]
        } : item
      );

      localStorage.setItem("items" , JSON.stringify(nuevaLista)) ;

      return registro ;
    }

    catch(errorActual){
      setError(errorActual.message) ;
      return null;
    }

    finally { setCargando(false) ; }

  } , [modo , API_URL]);



  return(

    <StorageContext.Provider value={{
      modo ,
      setModo,
      cargando ,
      error,
      obtenerItems,
      guardarItem ,
      actualizarItem,
      eliminarItem,
      registrarActividad ,
    }} >
      {children}
    </StorageContext.Provider>
  ) ;

}

export default StorageProvider ;