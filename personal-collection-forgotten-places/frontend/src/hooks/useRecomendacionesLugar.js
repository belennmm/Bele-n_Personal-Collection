/**
 * El hook maneja las recomendaciones de un lugar. Da el total de recomendaciones, una función para recomendar el lugar y otra para corregir una recomendación
 * @param {object} item es el lugar actual con sus registros de recomendaciones
 * @param {Function} onRegistrarActividad registra una recomendación o corrección
 * @returns {{totalRecomendaciones: number, recomendarLugar: Function, corregirRecomendacion: Function}} devuelve el total de recomendaciones y funciones para aumentar o corregir el contador
 */

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