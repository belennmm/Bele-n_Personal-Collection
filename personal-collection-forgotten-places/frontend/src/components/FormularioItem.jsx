import { useState } from "react" ;
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

  function handleSubmit(e){

    e.preventDefault() ;

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
  }

  return(

    <form onSubmit={handleSubmit } className="formulario">

      <h2>Agregar Lugares</h2>

      <div className="campo-formulario">
        <label htmlFor="nombre"> Nombre del lugar  </label>
        <input id="nombre" type="text" placeholder=" Nombre del lugar" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>

      <div className="campo-formulario">
        <label htmlFor="pais"> País </label>
        <input id="pais" type="text" placeholder="País" value={pais} onChange={(e) => setPais(e.target.value)} required  />
      </div>

      <div className="campo-formulario">
        <label htmlFor="categoria"> Categoría </label>
        <select id="categoria" value={categoriaId } onChange={(e)  => setCategoriaId(e.target.value)}>

          {CATEGORIAS.map( (categoria) => ( <option key={categoria.id} value={categoria.id}> {categoria.nombre} </option> ))}

        </select>
      </div>

      <div className="campo-formulario">
        <label htmlFor="estado">Estado de exploración</label>
        <select id="estado" value={estado} onChange={(e)  => setEstado(e.target.value) } >
          {ESTADOS.map((estadoItem) => ( <option key = {estadoItem} value= {estadoItem} > {estadoItem} </option> ))}

        </select>
      </div>

      <div className="campo-formulario">
        <label htmlFor="puntuacion"> Puntuación personal </label>
        <input id="puntuacion" type="number"  placeholder="Puntuación 0-10" min="0" max="10" value={puntuacion}  onChange={(e) => setPuntuacion(e.target.value)} />
      </div>

      <div className="campo-formulario">
        <label htmlFor="nivelOlvido"> ¿Qué tan olvidado consideras que está el lugar por turistas? </label>
        <select id="nivelOlvido" value={nivelOlvido} onChange={(e) => setNivelOlvido(e.target.value)} >
          <option value="bajo">Poco olvidado</option>
          <option value="medio">Medio olvidado</option>
          <option value="alto">Muy olvidado</option>
        </select>
      </div>

      <div className="campo-formulario">
        <label htmlFor="epoca">Época o contexto</label>
        <input id="epoca"  type="text"  placeholder="Época o contexto histórico"
          value={epoca} onChange={(e) => setEpoca(e.target.value)}  />
      </div>

      <div className="campo-formulario">
        <label htmlFor="acceso">Acceso </label>
        <select id="acceso" value={acceso} onChange={(e) => setAcceso(e.target.value)}>
          <option value="facil"> Acceso fácil  </option>
          <option value="moderado"> Acceso moderado </option>
          <option value="dificil"> Acceso difícil </option>
        </select>
      </div>

      <div className="campo-formulario">
        <label htmlFor="razonInteres"> Razón de interés </label>
        <textarea id="razonInteres" placeholder="Razón de interés"value={razonInteres} onChange={(e) => setRazonInteres(e.target.value)} />
      </div>

      <div className="campo-formulario">
        <label htmlFor="notas"> Notas personales </label>
        <textarea id="notas" placeholder="Notas personales" value={notas}  onChange={(e) => setNotas(e.target.value)} />
      </div>

      <button type="submit"> Agregar un lugar </button>
    </form>
  );
}

export default FormularioItem;