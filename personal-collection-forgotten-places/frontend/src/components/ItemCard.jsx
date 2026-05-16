

import { CATEGORIAS } from "../utils/categorias";
import { ESTADOS } from "../utils/estados";

function ItemCard({ item, onArchivarItem, onCambiarEstadoItem }) {
  const categoria = CATEGORIAS.find((cat) => cat.id === item.categoriaId);

  return (
    <article className="item-card">
      <div className="item-card-header">
        <div>
          <p className="categoria">{categoria?.nombre || "Sin categoría"}</p>
          <h3>{item.nombre}</h3>
        </div>

        <span
          className="color-categoria"
          style={{ backgroundColor: categoria?.color || "#999" }}
        ></span>
      </div>

      <div className="item-info">
        <p>
          <strong>País:</strong> {item.atributos?.pais || "Sin país"}
        </p>

        <p>
          <strong>Estado:</strong> {item.estado}
        </p>

        <p>
          <strong>Nivel de olvido:</strong>{" "}
          {item.atributos?.nivelOlvido || "No indicado"}
        </p>

        <p>
          <strong>Acceso:</strong> {item.atributos?.acceso || "No indicado"}
        </p>

        <p>
          <strong>Época:</strong> {item.atributos?.epoca || "No indicada"}
        </p>

        <p>
          <strong>Puntuación:</strong>{" "}
          {item.puntuacion !== null ? `${item.puntuacion}/10` : "Sin puntuación"}
        </p>
      </div>

      {item.atributos?.razonInteres && (
        <p className="razon">
          “{item.atributos.razonInteres}”
        </p>
      )}

      {item.notas && (
        <p className="notas">
          <strong>Notas:</strong> {item.notas}
        </p>
      )}

      <div className="acciones">
        <select
          value={item.estado}
          onChange={(e) => onCambiarEstadoItem(item.id, e.target.value)}
        >
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>

        <button type="button" onClick={() => onArchivarItem(item.id)}>
          Archivar
        </button>
      </div>
    </article>
  );
}

export default ItemCard;
