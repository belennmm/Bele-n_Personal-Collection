/**
 * Este es un hook para manejar el estado sincronizado con el LocalStorage del navegador
 * Permite poder almacenar los datos y que permanezcan después de recargar la página
 * @param {string} key es la clave para guardar y leer el valor en el LocalStorage
 * @param {*} initialValue es el valor inicial que está cuando no hay info  guardada
 * @returns {[*, Function]} este retorna el valor actual y la función para actualizarlo
 */

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