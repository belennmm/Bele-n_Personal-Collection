import { useState, useEffect } from "react";
import FormularioItem from "./components/FormularioItem";
import ListaItems from "./components/ListaItems" ;
import "./App.css";

function App(){

  const [items, setItems] = useState(() => {
    try { const guardado = localStorage.getItem( "items");
      return guardado ? JSON.parse(guardado) : [];
    } 
    catch {
      return [];
    }
  } );

  useEffect(() => { localStorage.setItem("items", JSON.stringify(items)) ; }, [items]);

  function agregarItem(nuevoItem) { setItems([...items, nuevoItem]);}

  function archivarItem(id) { const listaUpdated = items.map((item) =>
      item.id ===  id ? { ...item , activo: false } : item
    );

    setItems(listaUpdated);
  }

  function cambiarEstadoItem(id, nuevoEstado) {
    const listaUpdated = items.map((item) =>
      item.id === id ? { ...item, estado: nuevoEstado, fechaActividad: new Date().toISOString() } : item
    );

    setItems(listaUpdated);
  }

  const itemsActivos = items.filter((item) => item.activo);

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="etiqueta">Colección personal de viajes</p>
          <h1>Forgotten Places Centro América</h1>
          <p> Lugares olvidados, escondidos o poco conocidos de Centroamérica. </p>
        </div>
      </section>

      <section className="contenido">
        <FormularioItem onAgregarItem={agregarItem} />

        <ListaItems
          items={itemsActivos}
          onArchivarItem={archivarItem}
          onCambiarEstadoItem={cambiarEstadoItem}
        />
      </section>
    </main>
  );
}

export default App;