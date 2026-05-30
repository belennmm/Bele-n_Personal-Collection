import { useState, useRef , memo} from "react";
import { animate } from "animejs";
import { CATEGORIAS } from "../utils/categorias";
import { ESTADOS } from "../utils/estados";

function ItemCard({ item, onArchivarItem, onEditarItem, onRegistrarActividad }) {
  const categoria = CATEGORIAS.find((cat) => cat.id === item.categoriaId);
    const totalRecomendaciones = item.registros?.reduce((total , registro) => total + Number(registro.valor) , 0) || 0 ;

  
  const [mostrarEmoji, setMostrarEmoji] = useState(false);
  const categoriaMarkerRef = useRef(null);

  const rutaVueloRef = useRef(null) ;
  const avionRef = useRef(null) ;

  const [editando, setEditando] = useState(false);
  const [formEdit, setFormEdit] = useState({
    nombre: item.nombre,
    categoriaId: item.categoriaId,
    estado: item.estado,
    puntuacion: item.puntuacion !== null ? item.puntuacion : "",
    notas: item.notas,
    atributos: {
      pais: item.atributos?.pais || "",
      region: item.atributos?.region || "Centroamérica",
      nivelOlvido: item.atributos?.nivelOlvido || "medio",
      epoca: item.atributos?.epoca || "",
      acceso: item.atributos?.acceso || "moderado",
      razonInteres: item.atributos?.razonInteres || ""
    }
  });

    function cambiarMarkerCategoria() {
    animate(categoriaMarkerRef.current, {
      scale: [1, 0.7, 1],
      rotate: mostrarEmoji ? "-1turn" : "1turn",
      duration: 550,
      ease: "inOut(3)"
    });

    setMostrarEmoji(!mostrarEmoji);
  }

  function iniciarEdicion() {
    setFormEdit({
      nombre: item.nombre,
      categoriaId: item.categoriaId,
      estado: item.estado,
      puntuacion: item.puntuacion !== null ? item.puntuacion : "",
      notas: item.notas,
      atributos: {
        pais: item.atributos?.pais || "",
        region: item.atributos?.region || "Centroamérica",
        nivelOlvido: item.atributos?.nivelOlvido || "medio",
        epoca: item.atributos?.epoca || "",
        acceso: item.atributos?.acceso || "moderado",
        razonInteres: item.atributos?.razonInteres || ""
      }
    });

    setEditando(true);
  }

  function cambiarCampo(e) {
    const { name, value } = e.target;

    setFormEdit({
      ...formEdit,
      [name]: value
    });
  }

  function cambiarAtributo(e) {
    const { name, value } = e.target;

    setFormEdit({
      ...formEdit,
      atributos: {
        ...formEdit.atributos,
        [name]: value
      }
    });
  }

  async function guardarCambios(e) {
    e.preventDefault();

    const itemUpdated = {
      ...item,
      nombre: formEdit.nombre.trim(),
      categoriaId: formEdit.categoriaId,
      estado: formEdit.estado,
      puntuacion: formEdit.puntuacion ? Number(formEdit.puntuacion) : null,
      fechaActividad: new Date().toISOString(),
      notas: formEdit.notas.trim(),
      atributos: {
        ...formEdit.atributos,
        pais: formEdit.atributos.pais.trim(),
        region: "Centroamérica",
        epoca: formEdit.atributos.epoca.trim(),
        razonInteres: formEdit.atributos.razonInteres.trim()
      }
    };

    await onEditarItem(item.id, itemUpdated);

    setEditando(false);
  }

    async function recomendarLugar() {
    await onRegistrarActividad(item.id , 1) ;

    const distanciaVuelo = rutaVueloRef.current.offsetWidth - 32 ;

    animate(avionRef.current , {
      x: [0 , distanciaVuelo] ,
      y: [0 , -10 , 0] ,
      rotate: [-10 , 4 , 0] ,
      opacity: [0 , 1 , 1 , 0] ,
      duration: 1000 ,
      ease: "inOut(3)"
    }) ;
  }

  async function corregirRecomendacion() {
    if(totalRecomendaciones === 0){
      return ;
    }

    await onRegistrarActividad(item.id , -1) ;

    const distanciaVuelo = rutaVueloRef.current.offsetWidth - 32 ;

    animate(avionRef.current , {
      x: [distanciaVuelo , 0] ,
      y: [0 , -7 , 0] ,
      rotate: [180 , 170 , 180] ,
      opacity: [0 , 0.75 , 0.75 , 0] ,
      duration: 850 ,
      ease: "inOut(3)"
    }) ;
  }

  if(editando){
    return (
      <article className="itemMagazineEdit min-h-[540px] border-y border-[var(--color-acento)] py-8">
        <div className="mb-8 border-b border-[var(--color-acento)] pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-titulo-pagina)]">Edit travel entry</p>
          <h3 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-[var(--color-acento)]">Editar entrada</h3>
        </div>

        <form onSubmit={guardarCambios} className="grid gap-7">
          <div className="campoEdit grid gap-2">
            <label htmlFor={`nombre-${item.id}`} className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Nombre del lugar</label>
            <input id={`nombre-${item.id}`} className="border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-lg text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" type="text" name="nombre" value={formEdit.nombre} onChange={cambiarCampo} required />
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            <div className="campoEdit grid gap-2">
              <label htmlFor={`pais-${item.id}`} className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">País</label>
              <input id={`pais-${item.id}`} className="border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-lg text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" type="text" name="pais" value={formEdit.atributos.pais} onChange={cambiarAtributo} required />
            </div>

            <div className="campoEdit grid gap-2">
              <label htmlFor={`categoria-${item.id}`} className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Categoría</label>
              <select id={`categoria-${item.id}`} className="border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-lg text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" name="categoriaId" value={formEdit.categoriaId} onChange={cambiarCampo}>
                {CATEGORIAS.map((categoriaItem) => (
                  <option key={categoriaItem.id} value={categoriaItem.id}>
                    {categoriaItem.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            <div className="campoEdit grid gap-2">
              <label htmlFor={`estado-${item.id}`} className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Estado de exploración</label>
              <select id={`estado-${item.id}`} className="border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-lg text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" name="estado" value={formEdit.estado} onChange={cambiarCampo}>
                {ESTADOS.map((estadoItem) => (
                  <option key={estadoItem} value={estadoItem}>
                    {estadoItem}
                  </option>
                ))}
              </select>
            </div>

            <div className="campoEdit grid gap-2">
              <label className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Puntuación personal</label>

              <div className="flex gap-2 border-b border-[var(--color-acento)] pb-3">
                {[1 , 2 , 3 , 4 , 5].map((estrella) => (
                  <button className={`text-3xl transition ${estrella <= Number(formEdit.puntuacion) ? "text-[var(--color-acento)]" : "text-[#CBBDA6] hover:text-[var(--color-acento)]"}`} key={estrella} type="button" onClick={() => setFormEdit({ ...formEdit , puntuacion: estrella })}>
                    ★
                  </button>
                ))}
              </div>

              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-titulo-pagina)]">{formEdit.puntuacion ? `${formEdit.puntuacion} de 5 estrellas` : "Selecciona una calificación"}</p>
            </div>
          </div>

          <div className="campoEdit grid gap-2">
            <label htmlFor={`nivelOlvido-${item.id}`} className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">¿Qué tan olvidado consideras que está el lugar por turistas?</label>
            <select id={`nivelOlvido-${item.id}`} className="border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-lg text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" name="nivelOlvido" value={formEdit.atributos.nivelOlvido} onChange={cambiarAtributo}>
              <option value="bajo">Poco olvidado</option>
              <option value="medio">Medio olvidado</option>
              <option value="alto">Muy olvidado</option>
            </select>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            <div className="campoEdit grid gap-2">
              <label htmlFor={`epoca-${item.id}`} className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Época o contexto</label>
              <input id={`epoca-${item.id}`} className="border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-lg text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" type="text" name="epoca" value={formEdit.atributos.epoca} onChange={cambiarAtributo} />
            </div>

            <div className="campoEdit grid gap-2">
              <label htmlFor={`acceso-${item.id}`} className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Acceso</label>
              <select id={`acceso-${item.id}`} className="border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-lg text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" name="acceso" value={formEdit.atributos.acceso} onChange={cambiarAtributo}>
                <option value="facil">Acceso fácil</option>
                <option value="moderado">Acceso moderado</option>
                <option value="dificil">Acceso difícil</option>
              </select>
            </div>
          </div>

          <div className="campoEdit grid gap-2">
            <label htmlFor={`razonInteres-${item.id}`} className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Razón de interés</label>
            <textarea id={`razonInteres-${item.id}`} className="min-h-28 border border-[var(--color-acento)] bg-transparent p-4 text-lg leading-7 text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" name="razonInteres" value={formEdit.atributos.razonInteres} onChange={cambiarAtributo} />
          </div>

          <div className="campoEdit grid gap-2">
            <label htmlFor={`notas-${item.id}`} className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Notas personales</label>
            <textarea id={`notas-${item.id}`} className="min-h-24 border border-[var(--color-acento)] bg-transparent p-4 text-lg leading-7 text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" name="notas" value={formEdit.notas} onChange={cambiarCampo} />
          </div>

          <div className="mt-4 flex flex-col gap-4 border-t border-[var(--color-acento)] pt-7 sm:flex-row sm:justify-end">
            <button className="rounded-full border border-[var(--color-titulo-pagina)] px-7 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-titulo-pagina)] hover:text-[var(--color-pagina)]" type="button" onClick={() => setEditando(false)}>Cancelar</button>
            <button className="rounded-full border border-[var(--color-acento)] bg-[var(--color-acento)] px-7 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-texto-pagina)] transition hover:bg-[var(--color-titulo-pagina)] hover:text-[var(--color-pagina)]" type="submit">Guardar cambios</button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className="itemMagazinePage min-h-[540px] border-y border-[var(--color-acento)] py-8">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-titulo-pagina)]">{categoria?.nombre || "Sin categoría"}</p>
          <h3 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-[var(--color-acento)]">{item.nombre}</h3>
          <p className="mt-4 text-xl text-[var(--color-texto-pagina)]">{item.atributos?.pais || "Sin país"}</p>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Recomendaciones de viaje</p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p className="text-lg text-[var(--color-texto-pagina)]">{totalRecomendaciones} {totalRecomendaciones === 1 ? "vez recomendado" : "veces recomendado"}</p>


              <div className="flex items-center gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-acento)] text-lg font-bold text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-acento)] hover:text-[var(--color-texto-pagina)] disabled:cursor-not-allowed disabled:opacity-30" type="button" onClick={corregirRecomendacion} disabled={totalRecomendaciones === 0}>−</button>

                <button className="rounded-full border border-[var(--color-acento)] bg-[var(--color-acento)] px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-texto-pagina)] transition hover:bg-[var(--color-titulo-pagina)] hover:text-[var(--color-pagina)]" type="button" onClick={recomendarLugar}>+ Recomendar</button>
              </div>
              
            </div>
          </div>

          <div className="mt-7 max-w-md">
            <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-titulo-pagina)]">
              <span>Journal</span>
              <span>Shared route</span>
            </div>

            <div ref={rutaVueloRef} className="relative h-14 w-full overflow-hidden">
              <div className="absolute left-2 right-2 top-1/2 border-t border-dashed border-[var(--color-acento)] opacity-40"></div>

              <span className="absolute left-0 top-[23px] h-2 w-2 rounded-full bg-[var(--color-acento)]"></span>
              <span className="absolute right-0 top-[23px] h-2 w-2 rounded-full bg-[var(--color-acento)]"></span>

              <span ref={avionRef} className="absolute left-1 top-2 text-3xl text-[var(--color-acento)] opacity-0">✈︎</span>
            </div>
          </div>

          
        </div>


        <button ref={categoriaMarkerRef} className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-xl transition hover:border-[var(--color-acento)]" style={{ backgroundColor: mostrarEmoji ? "transparent" : categoria?.color || "#999" }} type="button" onClick={cambiarMarkerCategoria} aria-label={mostrarEmoji ? "Mostrar color de la categoría" : "Mostrar emoji de la categoría"} title={mostrarEmoji ? "Ver color de categoría" : "Ver emoji de categoría"}>
          {mostrarEmoji && categoria?.emoji}
        </button>
      </div>

      <div className="my-8 h-px bg-[var(--color-acento)]"></div>

      <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Estado de exploración</p>
          <p className="mt-2 text-lg text-[var(--color-texto-pagina)]">{item.estado}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Nivel de olvido</p>
          <p className="mt-2 text-lg text-[var(--color-texto-pagina)]">{item.atributos?.nivelOlvido || "No indicado"}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Acceso</p>
          <p className="mt-2 text-lg text-[var(--color-texto-pagina)]">{item.atributos?.acceso || "No indicado"}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Época o contexto</p>
          <p className="mt-2 text-lg text-[var(--color-texto-pagina)]">{item.atributos?.epoca || "No indicada"}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Puntuación personal</p>

          {item.puntuacion !== null ? (
            <div className="mt-3 flex items-center gap-1">
              {[1 , 2 , 3 , 4 , 5].map((estrella) => (
                <span className={`text-2xl ${estrella <= Number(item.puntuacion) ? "text-[var(--color-acento)]" : "text-[#CBBDA6]"}`} key={estrella}>★</span>
              ))}
              <span className="ml-3 text-sm text-[var(--color-texto-pagina)]">{item.puntuacion}/5</span>
            </div>
          ) : (
            <p className="mt-2 text-lg text-[var(--color-texto-pagina)]">Sin puntuación</p>
          )}
        </div>


      </div>

      {item.atributos?.razonInteres && (
        <div className="mt-10 border-l-2 border-[var(--color-acento)] pl-5">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Razón de interés</p>
          <p className="mt-4 text-xl italic leading-8 text-[var(--color-texto-pagina)]">“{item.atributos.razonInteres}”</p>
        </div>
      )}

      {item.notas && (
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Notas personales</p>
          <p className="mt-3 text-base leading-7 text-[var(--color-texto-pagina)]">{item.notas}</p>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-4 border-t border-[var(--color-acento)] pt-7 sm:flex-row sm:flex-wrap sm:justify-end">

        <button className="rounded-full border border-[var(--color-titulo-pagina)] px-7 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-titulo-pagina)] hover:text-[var(--color-pagina)]" type="button" onClick={iniciarEdicion}>Editar entrada</button>
        <button className="rounded-full border border-[var(--color-titulo-pagina)] px-7 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-titulo-pagina)] hover:text-[var(--color-pagina)]" type="button" onClick={() => onArchivarItem(item.id)}>Archivar lugar</button >
      </div>
    </article>
  );
}

export default memo(ItemCard);