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
    <main className="min-h-screen bg-[#0a0a0a] text-[#F4EFE6]">
      <section className="heroStartpage relative min-h-[85vh] overflow-hidden border-b border-[#0a0a0a] bg-[#0a0a0a] text-[#F4EFE6]">
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

            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#0a0a0a]">
              <span className="bg-[#D6A84F] px-4 py-2">Ruinas</span>
              <span className="bg-[#F4EFE6] px-4 py-2">Historia</span>
              <span className="bg-[#C08457] px-4 py-2">Exploración</span>
            </div>
          </div>

          <div className="coverMagazine border border-[#D6A84F] p-6">
            <p className="mb-8 text-right text-xs uppercase tracking-[0.4em] text-[#D6A84F]">Vol. 01</p>

            <div className="aspect-[3/4] border border-[#F4EFE6] bg-[#735d49] p-6">
              <div className="flex h-full flex-col justify-between">
                <p className="text-sm uppercase tracking-[0.35em] text-[#D6A84F]">The travel page</p>

                <div>
                  <p className="text-4xl font-black uppercase leading-none">Hidden<br />Central<br />America</p>
                </div>

                <p className="text-sm leading-6 text-[#E9DDC8]">Lugares con historia, memoria, misterio </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="magazineDivider mx-auto max-w-7xl px-6 py-10 md:px-16">
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-[#D6A84F]"></div>
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#D6A84F]">splendid forgotten places / Central America</p>
          <div className="h-px flex-1 bg-[#D6A84F]"></div>
        </div>
      </section>

      <section className="aboutCollection mx-auto max-w-7xl px-6 py-14 md:px-16">
        <div className="grid gap-8 border-b border-[#D6A84F] pb-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#C08457]">About the collection</p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em]">Una page personal de lugares olvidados</h2>
          </div>

          <p className="text-lg leading-8 text-[#F4EFE6]">Introducing and reporting different elements of various splendid forgotten places. </p>
        </div>
      </section>

              <section className="newEntryPage mx-auto max-w-7xl px-6 pb-24 md:px-16">
                <div className="bg-[#F7EEDC] px-8 py-14 text-[#17120E] md:px-12">
          <div className="grid gap-14 md:grid-cols-[0.65fr_1.35fr]">
            <div className="entryIntro md:sticky md:top-10 md:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#915a2d]">New entry</p>
              <h2 className="mt-5 text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-[#D6A84F]">Documentar un lugar olvidado</h2>
              <p className="mt-8 max-w-sm text-base leading-8 text-[#1E1A16]">Documenta el lugar que espléndido que haz visitado. Incluye todos los lugares para no olvidarlos.</p>

              <div className="mt-10 border-l-2 border-[#D6A84F] pl-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#915a2d]">Travel note</p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[#1E1A16]">Piensa en cada experiencia vivida. Todo lo que haz disfrutado visitando estos lugares poco conocidos por los turistas.</p>
              </div>

              <p className="mt-16 hidden text-xs font-bold uppercase tracking-[0.45em] text-[#915a2d] md:block">Page 01 / Field notes</p>
            </div>

            <div className="entryWritingPage border-l-0 border-[#D6A84F] md:border-l md:pl-14">
              <FormularioItem onAgregarItem={agregarItem} />
            </div>
          </div>
        </div>
      </section>

            <section className="archivePage mx-auto max-w-7xl px-6 pb-20 md:px-16">
        <div className="border-t border-[#D6A84F] pt-14">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#C08457]">Archive</p>
              <h2 className="mt-5 text-6xl font-black uppercase leading-[0.9] tracking-[-0.08em]">Archivo de lugares</h2>
            </div>

            <p className="max-w-lg text-sm leading-7 text-[#F4EFE6]">¡Recuerda todos los lugares espléndidos que visitaste! Todos los forgotten places que hicieron de tu viaje una experiencia inolvidable.</p>
          </div>

          <div className="archiveStartpage border-t border-[#D6A84F] pt-10">
            <ListaItems
              items={itemsActivos}
              onArchivarItem={archivarItem}
              onCambiarEstadoItem={cambiarEstadoItem}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;