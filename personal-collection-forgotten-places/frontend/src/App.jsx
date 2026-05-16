import { useState, useEffect } from "react";
import FormularioItem from "./components/FormularioItem";
import ListaItems from "./components/ListaItems" ;



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
    <main className="min-h-screen bg-[#F4EFE6] text-[#1E1A16]">
      <section className="heroStartpage relative min-h-[85vh] overflow-hidden border-b border-[#1E1A16] bg-[#1E1A16] text-[#F4EFE6]">
        <div className="hidden md:flex absolute left-6 top-8 h-[80%] items-center">
          <p className="rotate-180 [writing-mode:vertical-rl] text-xs font-semibold uppercase tracking-[0.6em] text-[#D6A84F]">Forgotten Places</p>
        </div>

        <div className="mx-auto grid min-h-[85vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-16">
          <div className="startpageText space-y-8">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#D6A84F]">Central America Travel Journal</p>
              <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.9] tracking-[-0.08em] md:text-8xl">Forgotten Places Centro América</h1>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-[#E9DDC8]">Lugares olvidados, escondidos o poco conocidos de Centroamérica.</p>

            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#1E1A16]">
              <span className="bg-[#D6A84F] px-4 py-2">Ruinas</span>
              <span className="bg-[#F4EFE6] px-4 py-2">Historia</span>
              <span className="bg-[#C08457] px-4 py-2">Exploración</span>
            </div>
          </div>

          <div className="coverMagazine border border-[#D6A84F] p-6">
            <p className="mb-8 text-right text-xs uppercase tracking-[0.4em] text-[#D6A84F]">Vol. 01</p>

            <div className="aspect-[3/4] border border-[#F4EFE6] bg-[#2F2A24] p-6">
              <div className="flex h-full flex-col justify-between">
                <p className="text-sm uppercase tracking-[0.35em] text-[#D6A84F]">The travel archive</p>

                <div>
                  <p className="text-4xl font-black uppercase leading-none">Hidden<br />Central<br />America</p>
                </div>

                <p className="text-sm leading-6 text-[#E9DDC8]">Lugares con historia, memoria, misterio </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aboutCollection mx-auto max-w-7xl px-6 py-14 md:px-16">
        <div className="grid gap-8 border-b border-[#1E1A16] pb-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8B5E3C]">About the collection</p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em]">Una page personal de lugares olvidados</h2>
          </div>

          <p className="text-lg leading-8 text-[#4A4037]">Equí pondré luego una definición de lo que es esta colección </p>
        </div>
      </section>

      <section className="contenidoJournal mx-auto grid max-w-7xl gap-8 px-6 pb-16 md:grid-cols-[420px_1fr] md:px-16">
        <div className="formularioStartpage rounded-none border border-[#1E1A16] bg-[#FFF9EF] p-6 shadow-[8px_8px_0px_#1E1A16]">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#8B5E3C]">New entry</p>

          <FormularioItem onAgregarItem={agregarItem} />
        </div>

        <div className="archiveStartpage rounded-none border border-[#1E1A16] bg-[#FFF9EF] p-6 shadow-[8px_8px_0px_#1E1A16]">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#8B5E3C]">Archive</p>

          <ListaItems
            items={itemsActivos}
            onArchivarItem={archivarItem}
            onCambiarEstadoItem={cambiarEstadoItem}
          />
        </div>
      </section>
    </main>
  );
}

export default App;