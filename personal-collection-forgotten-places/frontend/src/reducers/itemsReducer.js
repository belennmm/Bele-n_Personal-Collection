export const estadoInicialItems = {
  lista: [ ] ,
  filtroCategoria: "todas" ,
  filtroEstado : "todos",
  busqueda: ""
} ;


export function itemsReducer(estado , accion){

  switch(accion.type){

    case "HIDRATAR":
      return { ...estado ,
        lista: accion.payload
      } ;

    case "AGREGAR":
      return {...estado ,
        lista: [...estado.lista , accion.payload]
      } ;

    case "ELIMINAR":
      return {...estado ,
        lista: estado.lista.map(( item) => item.id === accion.payload ? { ...item , activo: false } : item )
      } ;

    case "CAMBIAR_ESTADO":
      return {
        ...estado ,
        lista: estado.lista.map((item ) => item.id === accion.payload.id ? { ...item , estado: accion.payload.estado , fechaActividad: accion.payload.fechaActividad } : item )
      } ;

    case "FILTRAR":
      return {
        ...estado ,
        ...accion.payload
      } ;

    case "LIMPIAR_FILTROS":
      return {
        ...estado ,
        filtroCategoria: "todas" ,
        filtroEstado: "todos" ,
        busqueda: ""
      } ;

    case "REGISTRAR_ACTIVIDAD":
      return {
        ...estado ,
        lista: estado.lista.map((item) =>
          item.id === accion.payload.itemId ? {
            ...item ,
            fechaActividad: accion.payload.fechaActividad ,
            registros: [...(item.registros || []) , accion.payload.registro]
          } : item
        )
      } ;

    case "EDITAR":
      return {
        ...estado ,
        lista: estado.lista.map(( item) => item.id === accion.payload.id ? { ...item, ...accion.payload.itemUpdated } : item )
      } ;

    default:
      return estado ;
  }
}