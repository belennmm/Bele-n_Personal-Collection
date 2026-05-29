import { useState , useEffect} from  "react" ;

function useLocalStorage( key, initialValue){

  const [value , setValue] = useState(() => {
    try { const itemGuardado = localStorage.getItem(key) ;
        return itemGuardado ? JSON.parse(itemGuardado) : initialValue ;
    }

    catch(error){
      console.error( "Error leyendo el LocalStorage:" , error);
      return initialValue ;
    }
  }) ;


  useEffect(() => {
    try {
      localStorage.setItem(key , JSON.stringify(value));
    }

    catch(error){
      console.error( "Error guardando en el LocalStorage:" , error) ;
    }
  } , [key , value ]) ;


  return  [value , setValue];
}

export default useLocalStorage;