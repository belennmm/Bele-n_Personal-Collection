import { useState, useEffect } from "react";
import { CATEGORIAS } from "../utils/categorias";
import ItemCard from "./ItemCard";

function ListaItems({ items, onArchivarItem, onEditarItem }) {
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(0);

  const itemsFiltrados = items.filter((item) => {
    const categoria = CATEGORIAS.find((cat) => cat.id === item.categoriaId);
    const textoBusqueda = busqueda.toLowerCase();

    return (
      item.nombre.toLowerCase().includes(textoBusqueda) ||
      item.atributos?.pais?.toLowerCase().includes(textoBusqueda) ||
      item.estado.toLowerCase().includes(textoBusqueda) ||
      categoria?.nombre.toLowerCase().includes(textoBusqueda)
    );
  });

  useEffect(() => {
    setPaginaActual(0);
  }, [busqueda]);

  useEffect(() => {
    if (paginaActual >= itemsFiltrados.length && itemsFiltrados.length > 0) {
      setPaginaActual(itemsFiltrados.length - 1);
    }
  }, [itemsFiltrados.length, paginaActual]);

  function mostrarAnterior() {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
    }
  }

  function mostrarSiguiente() {
    if (paginaActual < itemsFiltrados.length - 1) {
      setPaginaActual(paginaActual + 1);
    }
  }

  if (items.length === 0) {
    return (
      <section className="listaMagazine">
        <div className="border-b border-[var(--color-acento)] pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-titulo-pagina)]">Travel entries</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">Lugares guardados</h2>
        </div>

        <div className="flex min-h-[420px] flex-col items-center justify-center border-b border-[var(--color-acento)] text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-titulo-pagina)]">Empty archive</p>
          <p className="mt-5 max-w-sm text-lg leading-8 text-[var(--color-texto-pagina)]">Todavía no has agregado forgotten places de Centroamérica.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="listaMagazine">
      <div className="mb-8 border-b border-[var(--color-acento)] pb-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-titulo-pagina)]">Travel entries</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">Lugares guardados</h2>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">{itemsFiltrados.length} lugares activos</p>
        </div>

        <div className="mt-7">
          <label htmlFor="busqueda" className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-titulo-pagina)]">Buscar en el archivo</label>
          <input id="busqueda" className="mt-3 w-full border-0 border-b border-[var(--color-acento)] bg-transparent px-0 py-3 text-lg text-[var(--color-texto-pagina)] outline-none placeholder:text-[#8A8178] focus:border-[var(--color-titulo-pagina)]" type="text" placeholder="Nombre, país, categoría o estado..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
      </div>

      {itemsFiltrados.length === 0 ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-titulo-pagina)]">No results</p>
          <p className="mt-5 max-w-sm text-lg leading-8 text-[var(--color-texto-pagina)]">No encontré lugares que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-titulo-pagina)]">Page {String(paginaActual + 1).padStart(2, "0")} / {String(itemsFiltrados.length).padStart(2, "0")}</p>

            <div className="flex gap-3">
              <button className="rounded-full border border-[var(--color-acento)] px-4 py-2 text-sm font-bold text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-acento)] hover:text-[var(--color-texto-pagina)] disabled:cursor-not-allowed disabled:opacity-30" type="button" onClick={mostrarAnterior} disabled={paginaActual === 0}>←</button>
              <button className="rounded-full border border-[var(--color-acento)] px-4 py-2 text-sm font-bold text-[var(--color-titulo-pagina)] transition hover:bg-[var(--color-acento)] hover:text-[var(--color-texto-pagina)] disabled:cursor-not-allowed disabled:opacity-30" type="button" onClick={mostrarSiguiente} disabled={paginaActual === itemsFiltrados.length - 1}>→</button>
            </div>
          </div>

          <ItemCard
            key={itemsFiltrados[paginaActual].id}
            item={itemsFiltrados[paginaActual]}
            onArchivarItem={onArchivarItem}
            onEditarItem={onEditarItem}
          />
          
        </>
      )}
    </section>
  );
}

export default ListaItems;