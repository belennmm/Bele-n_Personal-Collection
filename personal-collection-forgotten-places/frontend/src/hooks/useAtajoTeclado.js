/**
 * Un hook para manejar atajos de teclado. Este recibe las tecla a escuchar y una función callback
 * @param {string} tecla es la tecla o teclas que activan el atajo
 * @param {Function} callback se ejecuta cuando se detecta la tecla, recibe el evento de teclado como argumento
 * @param {boolean} activo indica si el atajo está habilitado o no, por defecto es true
 * @returns {void} no da ningún valor
 */

import { useEffect } from "react" ;


function useAtajoTeclado(tecla , callback , activo = true){

  useEffect(() => {

    if(!activo){
      return ;
    }

    function manejarTecla(e){
      const escribiendo = e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT" ;

      if(escribiendo){
        return ;
      }

      if(e.key.toLowerCase() === tecla.toLowerCase()){
        callback(e) ;
      }
    }

    window.addEventListener("keydown" , manejarTecla) ;

    return () => {
      window.removeEventListener("keydown" , manejarTecla) ;
    } ;
  } , [tecla , callback , activo]) ;
}

export default useAtajoTeclado ;