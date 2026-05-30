import { useState, useEffect, useContext, useReducer, useMemo, useCallback } from "react";
import FormularioItem from "./components/FormularioItem";
import ListaItems from "./components/ListaItems" ;

import { StorageContext } from "./context/StorageContext" ;
import { ThemeContext } from "./context/ThemeContext" ;
import JournalTimer from "./components/JournalTimer" ;
import { itemsReducer, estadoInicialItems } from "./reducers/itemsReducer" ;
import EstadisticasJournal from "./components/EstadisticasJournal" ;




function App(){

  const { modo , setModo, cargando , error, obtenerItems, guardarItem, actualizarItem , eliminarItem, registrarActividad } = useContext( StorageContext) ;
  const { tema , toggleTema } = useContext(ThemeContext) ;

  const [estadoItems ,dispatch ] = useReducer( itemsReducer , estadoInicialItems) ;

  const items = estadoItems.lista;

  const filtroCategoria = estadoItems.filtroCategoria ;
  const filtroEstado = estadoItems.filtroEstado;
  const  busqueda = estadoItems.busqueda;
  
  useEffect(() => {

      function cambiarTemaConAtajo(e){
         
        const escribiendo =["INPUT" , "TEXTAREA", "SELECT"].includes( e.target.tagName) ;

        if(escribiendo ){ return ;}

        if(e.key.toLowerCase( ) === "t" ){ toggleTema(); }
      }

      window.addEventListener("keydown" , cambiarTemaConAtajo) ;

      return () => { window.removeEventListener( "keydown", cambiarTemaConAtajo) ;} ;
  } , [toggleTema] ) ;
  
    useEffect(() => {
      async function cargarItems() {
        const data = await obtenerItems() ;
        
        dispatch( { type : "HIDRATAR" ,  payload: data });
      }
      
      cargarItems() ;
    } , [obtenerItems, modo]) ;

    const agregarItem = useCallback(async (newItem) => {
      const itemGuardado = await guardarItem(newItem) ;
      
      if(itemGuardado){dispatch( { type : "AGREGAR",  payload: itemGuardado });
      }
    } , [guardarItem]) ;

    
    const archivarItem = useCallback(async (id) => {
      const exito = await eliminarItem(id) ;
      if(exito){ dispatch({ type: "ELIMINAR", payload: id });
      }
    } , [eliminarItem]) ;

    const cambiarEstadoItem = useCallback(async (id, nuevoEstado) => {
      const itemActual = items.find((item) => item.id === id) ;

      if(!itemActual){ return ;}

      const fechaActividad = new Date().toISOString() ;
      const itemUpdated = { ...itemActual , estado: nuevoEstado, fechaActividad };

      const actualizado = await actualizarItem(id , itemUpdated) ;

      if(actualizado){
        dispatch({
          type: "CAMBIAR_ESTADO" ,
          payload: { id , estado: nuevoEstado , fechaActividad }
        }) ;
      }
    } , [items , actualizarItem]) ;

    const editarItem = useCallback(async (id , itemUpdated) => {
      const actualizado = await actualizarItem(id , itemUpdated) ;

      if(actualizado ){
        dispatch({
          type : "EDITAR",
          payload: { id , itemUpdated: actualizado  }
        });
      }
    } , [actualizarItem]) ;

    
    const registrarActividadItem = useCallback(async (itemId , valor) => {
      const fechaActividad = new Date().toISOString() ;

      const registro = {
        id: crypto.randomUUID() ,
        itemId ,
        fecha: fechaActividad.split("T")[0] ,
        valor ,
        notas: valor === 1 ? "Recomendación registrada" : "Corrección de recomendación"
      } ;

      const registroGuardado = await registrarActividad(itemId , registro , fechaActividad) ;

      if(registroGuardado){
        dispatch({
          type: "REGISTRAR_ACTIVIDAD" ,
          payload: {
            itemId ,
            fechaActividad ,
            registro: registroGuardado
          }
        }) ;
      }
    } , [registrarActividad]) ;
    
    const cambiarFiltroCategoria = useCallback((nuevaCategoria) => {
      dispatch({ type: "FILTRAR" ,
        payload: { filtroCategoria: nuevaCategoria } }) ;
    } , []) ;

    const cambiarFiltroEstado = useCallback((nuevoEstado) => {
      dispatch({
        type: "FILTRAR" , payload: {  filtroEstado: nuevoEstado } } );
    } , []) ;

    const cambiarBusqueda = useCallback((nuevaBusqueda) => {
      dispatch({
        type: "FILTRAR" ,
        payload: { busqueda: nuevaBusqueda }
      } );
    } , []) ;

    const limpiarFiltros = useCallback(() => {dispatch({ type: "LIMPIAR_FILTROS" } ) ; } , []) ;


    const itemsqueActivos = useMemo(() => items.filter((item ) => {
    const coincideActivo =  item.activo;
    const coincideCategoria  = filtroCategoria === "todas" || item.categoriaId === filtroCategoria;
    const coincideEstado=  filtroEstado === "todos" || item.estado === filtroEstado ;
    const textoBusqueda = busqueda.toLowerCase( ) ;
    const coincideBusqueda  = item.nombre.toLowerCase().includes(textoBusqueda) || item.atributos?.pais?.toLowerCase( ).includes(textoBusqueda);

        return coincideActivo && coincideCategoria && coincideEstado && coincideBusqueda ;
      }) , [items , filtroCategoria , filtroEstado , busqueda]) ;

    const totalItemsActivos = useMemo(() => items.filter((item) => item.activo).length , [items]) ;

    

   return (
    <main className="min-h-screen bg-[var(--color-fondo)] text-[var(--color-texto)]">
      <section className="heroStartpage relative min-h-[85vh] overflow-hidden border-b border-[var(--color-fondo)] bg-[var(--color-fondo)] text-[var(--color-texto)]">
        <div className="hidden md:flex absolute left-6 top-8 h-[80%] items-center">
          <p className="rotate-180 [writing-mode:vertical-rl] text-xs font-semibold uppercase tracking-[0.6em] text-[var(--color-acento)]">Forgotten Places</p>
        </div>

        <div className="mx-auto grid min-h-[85vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-16">
          <div className="startpageText space-y-8">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[var(--color-acento)]">Central America Travel Journal</p>
              <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.9] tracking-[-0.08em] md:text-8xl">Forgotten Places Centro América</h1>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-[var(--color-texto-suave)]">Lugares olvidados, escondidos o poco conocidos de Centroamérica.</p>

            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-fondo)]">
              <span className="bg-[var(--color-acento)] px-4 py-2">Ruinas</span>
              <span className="bg-[var(--color-texto)] px-4 py-2">Historia</span>
              <span className="bg-[var(--color-acento-secundario)] px-4 py-2">Exploración</span>
            </div>
          </div>

          <div className="coverMagazine border border-[var(--color-acento)] p-6">
            <p className="mb-8 text-right text-xs uppercase tracking-[0.4em] text-[var(--color-acento)]">Vol. 01</p>

            <div className="aspect-[3/4] border border-[var(--color-texto)] bg-[var(--color-cover)] p-6">
              <div className="flex h-full flex-col justify-between">
                <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-acento)]">The travel page</p>

                <div>
                  <p className="text-4xl font-black uppercase leading-none">Hidden<br />Central<br />America</p>
                </div>

                <p className="text-sm leading-6 text-[var(--color-texto-suave)]">Lugares con historia, memoria, misterio </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="magazineDivider mx-auto max-w-7xl px-6 py-10 md:px-16">
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-[var(--color-acento)]"></div>
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-[var(--color-acento)]">splendid forgotten places / Central America</p>
          <div className="h-px flex-1 bg-[var(--color-acento)]"></div>
        </div>
      </section>
      
      <div className="flex justify-center my-6">
        <button className="rounded-full border border-[var(--color-acento)] px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-acento)] transition hover:bg-[var(--color-acento)] hover:text-[var(--color-fondo)]" type="button" onClick={toggleTema}>
          Tema: {tema}
        </button>
      </div>

      <JournalTimer />
            
      <section className="modoStorage mx-auto max-w-7xl px-6 pb-8 md:px-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-[var(--color-acento)] px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-acento)]">Storage mode</p>
            <p className="mt-1 text-sm text-[var(--color-texto)]">Modo actual: {modo}</p>
          </div>

          <div className="flex gap-3">
            <button className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] ${modo === "local" ? "bg-[var(--color-acento)] text-[var(--color-fondo)]" : "border border-[var(--color-acento)] text-[var(--color-acento)]"}`} type="button" onClick={() => setModo("local")}>Local</button>
            <button className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] ${modo === "api" ? "bg-[var(--color-acento)] text-[var(--color-fondo)]" : "border border-[var(--color-acento)] text-[var(--color-acento)]"}`} type="button" onClick={() => setModo("api")}>API</button>
          </div>
  
        </div>

        {cargando && <p className="mt-3 text-sm text-[var(--color-acento)]">Cargando datos...</p>}
        {error && <p className="mt-3 text-sm text-[var(--color-acento-secundario)]">Error: {error}</p>}

        
      </section>

      <section className="aboutCollection mx-auto max-w-7xl px-6 py-14 md:px-16">
        <div className="grid gap-8 border-b border-[var(--color-acento)] pb-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-acento-secundario)]">About the collection</p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em]">Una page personal de lugares olvidados</h2>
          </div>

          <p className="text-lg leading-8 text-[var(--color-texto)]">Introducing and reporting different elements of various splendid forgotten places. </p>
        </div>
      </section>

              <section className="newEntryPage mx-auto max-w-7xl px-6 pb-24 md:px-16">
                <div className="bg-[var(--color-pagina)] px-8 py-14 text-[var(--color-texto-pagina)] md:px-12">
          <div className="grid gap-14 md:grid-cols-[0.65fr_1.35fr]">
            <div className="entryIntro md:sticky md:top-10 md:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.45em] text-[var(--color-titulo-pagina)]">New entry</p>
              <h2 className="mt-5 text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-[var(--color-acento)]">Documentar un lugar olvidado</h2>
              <p className="mt-8 max-w-sm text-base leading-8 text-[var(--color-texto-pagina)]">Documenta el lugar que espléndido que haz visitado. Incluye todos los lugares para no olvidarlos.</p>

              <div className="mt-10 border-l-2 border-[var(--color-acento)] pl-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Travel note</p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-texto-pagina)]">Piensa en cada experiencia vivida. Todo lo que haz disfrutado visitando estos lugares poco conocidos por los turistas.</p>
              </div>

              <p className="mt-16 hidden text-xs font-bold uppercase tracking-[0.45em] text-[var(--color-titulo-pagina)] md:block">Page 01 / Field notes</p>
            </div>

            <div className="entryWritingPage border-l-0 border-[var(--color-acento)] md:border-l md:pl-14">
              <FormularioItem onAgregarItem={agregarItem} />
            </div>
          </div>
        </div>
      </section>

          <section className="archivePage mx-auto max-w-7xl px-6 pb-20 md:px-16">
              <div className="bg-[var(--color-pagina)] px-8 py-14 text-[var(--color-texto-pagina)] md:px-12">
          <div className="grid gap-14 md:grid-cols-[0.65fr_1.35fr]">
            <div className="archiveIntro md:sticky md:top-10 md:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.45em] text-[var(--color-titulo-pagina)]">Archive</p>
              <h2 className="mt-5 text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-[var(--color-acento)]">Archivo de lugares</h2>
              <p className="mt-8 max-w-sm text-base leading-8 text-[var(--color-texto-pagina)]">¡Recuerda todos los lugares espléndidos que visitaste! Todos los forgotten places que hicieron de tu viaje una experiencia inolvidable.</p>

              <div className="mt-10 border-l-2 border-[var(--color-acento)] pl-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Archive note</p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-texto-pagina)]">Cada lugar guardado funciona como una pequeña entrada de revista dentro de tu colección personal de viajes.</p>
              </div>

              <p className="mt-16 hidden text-xs font-bold uppercase tracking-[0.45em] text-[var(--color-titulo-pagina)] md:block">Page 02 / Travel archive</p>
            </div>

            <div className="archiveWritingPage border-l-0 border-[var(--color-acento)] md:border-l md:pl-14">
              
              <ListaItems
                items={ itemsqueActivos }
                totalItems={totalItemsActivos}
                filtroCategoria= { filtroCategoria }
                filtroEstado={ filtroEstado}
                busqueda={busqueda }
                onCambiarFiltroCategoria = { cambiarFiltroCategoria}
                onCambiarFiltroEstado = { cambiarFiltroEstado}
                onCambiarBusqueda= { cambiarBusqueda }
                onLimpiarFiltros={limpiarFiltros}
                onArchivarItem={ archivarItem}
                onEditarItem= { editarItem}
                onRegistrarActividad={registrarActividadItem}
              />
            </div>
            
          </div>
        </div>
      </section>
            <EstadisticasJournal items={itemsqueActivos} />
    </main>
  );

}

export default App;