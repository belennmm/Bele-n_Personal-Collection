import { useState } from "react";
import { CATEGORIAS } from "../utils/categorias";
import { ESTADOS } from "../utils/estados";

function ItemCard({ item, onArchivarItem, onEditarItem }) {
  const categoria = CATEGORIAS.find((cat) => cat.id === item.categoriaId);

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
              <label htmlFor={`puntuacion-${item.id}`} className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Puntuación personal</label>
              <input id={`puntuacion-${item.id}`} className="border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-lg text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" type="number" name="puntuacion" min="0" max="10" value={formEdit.puntuacion} onChange={cambiarCampo} />
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
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-titulo-pagina)]">{categoria?.nombre || "Sin categoría"}</p>
          <h3 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-[var(--color-acento)]">{item.nombre}</h3>
          <p className="mt-4 text-xl text-[var(--color-texto-pagina)]">{item.atributos?.pais || "Sin país"}</p>
        </div>

        <span className="mt-1 h-4 w-4 rounded-full" style={{ backgroundColor: categoria?.color || "#999" }}></span>
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
          <p className="mt-2 text-lg text-[var(--color-texto-pagina)]">{item.puntuacion !== null ? `${item.puntuacion}/10` : "Sin puntuación"}</p>
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

      <div className="mt-10 flex flex-col gap-4 border-t border-[var(--color-acento)] pt-7 sm:flex-row sm:justify-end">
        <button className="rounded-full border border-[var(--color-titulo-pagina)] px-7 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-titulo-pagina)] hover:text-[var(--color-pagina)]" type="button" onClick={iniciarEdicion}>Editar entrada</button>

        <button className="rounded-full border border-[var(--color-titulo-pagina)] px-7 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-titulo-pagina)] hover:text-[var(--color-pagina)]" type="button" onClick={() => onArchivarItem(item.id)}>Archivar lugar</button>
      </div>
    </article>
  );
}

export default ItemCard;