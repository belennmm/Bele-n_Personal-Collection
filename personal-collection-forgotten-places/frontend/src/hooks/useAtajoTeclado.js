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