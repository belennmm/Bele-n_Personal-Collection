import { useState, useEffect } from "react";
import { CATEGORIAS } from "../utils/categorias";
import { ESTADOS } from "../utils/estados";
import ItemCard from "./ItemCard";

function ListaItems({ items, totalItems, filtroCategoria, filtroEstado, busqueda, onCambiarFiltroCategoria , onCambiarFiltroEstado, onCambiarBusqueda, onLimpiarFiltros, onArchivarItem , onEditarItem }) {
  const [paginaActual, setPaginaActual] = useState(0);

  useEffect(() => {
    setPaginaActual(0) ;
  }, [busqueda , filtroCategoria, filtroEstado] );

  useEffect(() => {
    if (paginaActual >= items.length && items.length > 0) { setPaginaActual(items.length - 1); }
  } , [items.length, paginaActual]);

  function mostrarAnterior() {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
    }
  }

  function mostrarSiguiente() {
    if (paginaActual < items.length - 1){  setPaginaActual(paginaActual + 1);  }
  }

  return (
    <section className="listaMagazine">
      <div className="mb-8 border-b border-[var(--color-acento)] pb-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-titulo-pagina)]">Travel entries</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">Lugares guardados</h2>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">{items.length} de {totalItems} lugares</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="filtroCategoria" className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Categoría</label>
            <select id="filtroCategoria" className="mt-3 w-full border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-base text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" value={filtroCategoria} onChange={(e) => onCambiarFiltroCategoria(e.target.value)}>
              <option value="todas">Todas las categorías</option>

              {CATEGORIAS.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre }
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filtroEstado" className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Estado de exploración</label>
            <select id="filtroEstado" className="mt-3 w-full border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-base text-[var(--color-texto-pagina)] outline-none focus:border-[var(--color-titulo-pagina)]" value={filtroEstado} onChange={(e) => onCambiarFiltroEstado(e.target.value)}>
              <option value="todos"> Todos los estados </option>

              {ESTADOS.map((estado) => ( <option key={estado} value={estado}> {estado} </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-7">
          <label htmlFor="busqueda" className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]"> Buscar en el archivo </label>
          <input id="busqueda" className="mt-3 w-full border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-lg text-[var(--color-texto-pagina)] outline-none placeholder:text-[#8A8178] focus:border-[var(--color-titulo-pagina)]" type="text" placeholder="Nombre del lugar o país..." value={busqueda} onChange={(e) => onCambiarBusqueda(e.target.value)} />
        </div>

        <div className="mt-7 flex justify-end">
          <button className="rounded-full border border-[var(--color-titulo-pagina)] px-7 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-titulo-pagina)] hover:text-[var(--color-pagina)]" type="button" onClick={onLimpiarFiltros}>Limpiar filtros</button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          < p className ="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-titulo-pagina)]">No results</p>
          <p className= "mt-5 max-w-sm text-lg leading-8 text-[var(--color-texto-pagina)]">No encontré lugares que coincidan con los filtros seleccionados.</p>
        </div>

      ) : (
        <>
          <div className="mb-5 flex items-center justify-between">
            
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-titulo-pagina)]"> Page {String(paginaActual + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p>

            <div className ="flex gap-3">
              <button className = "rounded-full border border-[var(--color-acento)] px-4 py-2 text-sm font-bold text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-acento)] hover:text-[var(--color-texto-pagina)] disabled:cursor-not-allowed disabled:opacity-30" type="button" onClick={mostrarAnterior} disabled={ paginaActual === 0} >←</button>
             
              <button className="rounded-full border border-[var(--color-acento)] px-4 py-2 text-sm font-bold text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-acento)] hover:text-[var(--color-texto-pagina)] disabled:cursor-not-allowed disabled:opacity-30" type="button" onClick={mostrarSiguiente} disabled= { paginaActual ===  items.length - 1}>→</button>
            </div >

          </div>

          <ItemCard
            key = { items[paginaActual ].id}
            item ={items[paginaActual] }
            onArchivarItem= {onArchivarItem }
            onEditarItem= { onEditarItem}
          />

        </>
      )}
    </section>
  );
}

export default ListaItems;