import { useMemo, useCallback } from "react" ;


function useRecomendacionesLugar(item , onRegistrarActividad){

  const totalRecomendaciones = useMemo(() => {
    return item.registros?.reduce((total , registro) =>
      total + Number(registro.valor)
    , 0) || 0 ;
  } , [item.registros]) ;


  const recomendarLugar = useCallback(async () => {
    await onRegistrarActividad(item.id , 1) ;
  } , [item.id , onRegistrarActividad]) ;


  const corregirRecomendacion = useCallback(async () => {
    if(totalRecomendaciones === 0){
      return ;
    }

    await onRegistrarActividad(item.id , -1) ;
  } , [item.id , onRegistrarActividad , totalRecomendaciones]) ;


  return {
    totalRecomendaciones ,
    recomendarLugar ,
    corregirRecomendacion
  } ;
}

export default useRecomendacionesLugar ;