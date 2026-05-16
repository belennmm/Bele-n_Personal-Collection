

import ItemCard from "./ItemCard";

function ListaItems({ items, onArchivarItem, onCambiarEstadoItem }) {
  if (items.length === 0) {
    return (
      <section className="lista">
        <h2>Lugares guardados</h2>
        <p className="mensaje-vacio">
          Todavía no has agregado forgotten places de Centroamérica.
        </p>
      </section>
    );
  }

  return (
    <section className="lista">
      <div className="lista-header">
        <h2>Lugares guardados</h2>
        <span>{items.length} lugares activos</span>
      </div>

      <div className="grid-items">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onArchivarItem={onArchivarItem}
            onCambiarEstadoItem={onCambiarEstadoItem}
          />
        ))}
      </div>
    </section>
  );
}

export default ListaItems;