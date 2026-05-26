import { useState, useRef , useEffect }  from "react" ;
import { CATEGORIAS } from "../utils/categorias" ;
import { ESTADOS } from "../utils/estados" ;

function FormularioItem({ onAgregarItem }){
  const [nombre , setNombre ]  = useState("") ;
   const [pais , setPais ] =  useState( " " ) ;
  const [categoriaId , setCategoriaId ] = useState( "ruinas") ;
  const [ estado , setEstado ] = useState("por investigar") ;
  const [ puntuacion , setPuntuacion ] = useState("" ) ;
  const [nivelOlvido , setNivelOlvido ] =  useState("medio") ;
  const [epoca , setEpoca ] = useState("" ) ;
  const [ acceso , setAcceso ] = useState( "moderado" ) ;
  const [ razonInteres , setRazonInteres ] =  useState("") ;
  const [notas , setNotas ] = useState("") ;

    const nombreInputRef = useRef(null) ;

  useEffect(() => {
    function enfocarConAtajo(e){
      if(e.altKey && e.key.toLowerCase() === "n"){ e.preventDefault() ; nombreInputRef.current.focus() ; }
    }

    window.addEventListener("keydown" , enfocarConAtajo ) ;

    return () => {window.removeEventListener( "keydown" , enfocarConAtajo) ; } ;
  } , []) ;

  function handleSubmit(e){

    e.preventDefault() ;

    if(!puntuacion){
      alert("Selecciona una calificación de 1 a 5 estrellas") ;
      return ;
    }

    const nuevoItem = {
      id: crypto.randomUUID() ,
      nombre: nombre.trim() ,
      categoriaId ,
      estado ,
      puntuacion: puntuacion ? Number(puntuacion) : null ,
      fechaRegistro : new Date().toISOString() ,
      fechaActividad : new Date().toISOString() ,
      notas: notas.trim() ,

      atributos:{
        pais : pais.trim() ,
        region : "Centroamérica",
        nivelOlvido ,
        epoca : epoca.trim(),
        acceso ,
        razonInteres: razonInteres.trim()
      } ,

       activo: true
    } ;

    onAgregarItem(nuevoItem);

    setNombre("") ;
    setPais("") ;
    setCategoriaId("ruinas") ;

    setEstado("por investigar");
    setPuntuacion("") ;
    setNivelOlvido("medio") ;
    setEpoca("" );
    setAcceso("moderado" );
    setRazonInteres("" ) ;
    setNotas(""  );
    nombreInputRef.current.focus( ) ;
  }

    return(

    <form onSubmit={handleSubmit } className="formularioMagazine grid gap-5">

      <div className="border-b border-[#1E1A16] pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#915a2d]">Field notes</p>
        <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em] text-[#1E1A16]">Agregar Lugar</h2>
      </div>

      <div className="campo-formulario grid gap-2">
        <label htmlFor="nombre" className="text-xs font-bold uppercase tracking-[0.22em] text-[#915a2d]">Nombre del lugar</label>
        <input ref={nombreInputRef} id="nombre" className="border-0 border-b border-[#1E1A16] bg-transparent px-0 py-2 text-lg outline-none placeholder:text-[#8A8178] focus:border-[#D6A84F]" type="text" placeholder="Nombre del lugar" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="campo-formulario grid gap-2">
          <label htmlFor="pais" className="text-xs font-bold uppercase tracking-[0.22em] text-[#915a2d]">País</label>
          <input id="pais" className="border-0 border-b border-[#1E1A16] bg-transparent px-0 py-2 text-lg outline-none placeholder:text-[#8A8178] focus:border-[#D6A84F]" type="text" placeholder="País" value={pais} onChange={(e) => setPais(e.target.value)} required  />
        </div>

        <div className="campo-formulario grid gap-2">
          <label htmlFor="categoria" className="text-xs font-bold uppercase tracking-[0.22em] text-[#915a2d]">Categoría</label>
          <select id="categoria" className="border-0 border-b border-[#1E1A16] bg-transparent px-0 py-2 text-lg outline-none focus:border-[#D6A84F]" value={categoriaId } onChange={(e)  => setCategoriaId(e.target.value)}>

            {CATEGORIAS.map( (categoria) => (
              <option key={categoria.id} value={categoria.id}> {categoria.nombre} </option>
            ))}

          </select>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="campo-formulario grid gap-2">
          <label htmlFor="estado" className="text-xs font-bold uppercase tracking-[0.22em] text-[#915a2d]">Estado de exploración</label>
          <select id="estado" className="border-0 border-b border-[#1E1A16] bg-transparent px-0 py-2 text-lg outline-none focus:border-[#D6A84F]" value={estado} onChange={(e)  => setEstado(e.target.value) } >
            {ESTADOS.map((estadoItem) => (
              <option key = {estadoItem} value= {estadoItem} > {estadoItem} </option>
            ))}

          </select>
        </div>

        <div className="campo-formulario grid gap-2">
          <label className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-titulo-pagina)]">Puntuación personal</label>

          <div className="flex gap-2 border-b border-[var(--color-acento)] pb-3">
            {[1 , 2 , 3 , 4 , 5].map((estrella) => (
              <button className={`text-3xl transition ${estrella <= Number(puntuacion) ? "text-[var(--color-acento)]" : "text-[#CBBDA6] hover:text-[var(--color-acento)]"}`} key={estrella} type="button" onClick={() => setPuntuacion(estrella)}>
                ★
              </button>
            ))}
          </div>

          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-titulo-pagina)]">{puntuacion ? `${puntuacion} de 5 estrellas` : "Selecciona una calificación"}</p>
        </div>
      </div>

      <div className="campo-formulario grid gap-2">
        <label htmlFor="nivelOlvido" className="text-xs font-bold uppercase tracking-[0.22em] text-[#915a2d]"> ¿Qué tan olvidado consideras que está el lugar por turistas? </label>
        <select id="nivelOlvido" className="border-0 border-b border-[#1E1A16] bg-transparent px-0 py-2 text-lg outline-none focus:border-[#D6A84F]" value={nivelOlvido} onChange={(e) => setNivelOlvido(e.target.value)} >
          <option value="bajo">Poco olvidado</option>
          <option value="medio">Medio olvidado</option>
          <option value="alto">Muy olvidado</option>
        </select>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="campo-formulario grid gap-2">
          <label htmlFor="epoca" className="text-xs font-bold uppercase tracking-[0.22em] text-[#915a2d]">Época o contexto</label>
          <input
            id="epoca"
            className="border-0 border-b border-[#1E1A16] bg-transparent px-0 py-2 text-lg outline-none placeholder:text-[#8A8178] focus:border-[#D6A84F]"
            type="text"
            placeholder="Época o contexto histórico"
            value={epoca}
            onChange={(e) => setEpoca(e.target.value)}
          />
        </div>

        <div className="campo-formulario grid gap-2">
          <label htmlFor="acceso" className="text-xs font-bold uppercase tracking-[0.22em] text-[#915a2d]">Acceso</label>
          <select id="acceso" className="border-0 border-b border-[#1E1A16] bg-transparent px-0 py-2 text-lg outline-none focus:border-[#D6A84F]" value={acceso} onChange={(e) => setAcceso(e.target.value)}>
            <option value="facil">Acceso fácil</option>
            <option value="moderado">Acceso moderado</option>
            <option value="dificil">Acceso difícil</option>
          </select>
        </div>
      </div>

      <div className="campo-formulario grid gap-2">
        <label htmlFor="razonInteres" className="text-xs font-bold uppercase tracking-[0.22em] text-[#915a2d]">Razón de interés</label>
        <textarea
          id="razonInteres"
          className="min-h-28 border border-[#1E1A16] bg-transparent p-4 text-lg leading-7 outline-none placeholder:text-[#8A8178] focus:border-[#D6A84F]"
          placeholder="Escribe por qué este lugar merece ser recordado..."
          value={razonInteres}
          onChange={(e) => setRazonInteres(e.target.value)}
        />
      </div>

      <div className="campo-formulario grid gap-2">
        <label htmlFor="notas" className="text-xs font-bold uppercase tracking-[0.22em] text-[#915a2d]">Notas personales</label>
        <textarea
          id="notas"
          className="min-h-24 border border-[#1E1A16] bg-transparent p-4 text-lg leading-7 outline-none placeholder:text-[#8A8178] focus:border-[#D6A84F]"
          placeholder="Agrega detalles, recuerdos, dudas o ideas para investigar..."
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
      </div>

      <button className="mt-2 border border-[#1E1A16] bg-[#1E1A16] px-6 py-4 text-sm font-bold uppercase tracking-[0.28em] text-[#D6A84F] transition hover:bg-[#D6A84F] hover:text-[#1E1A16]" type="submit">Agregar un lugar</button>
    </form>
  );
}

export default FormularioItem;