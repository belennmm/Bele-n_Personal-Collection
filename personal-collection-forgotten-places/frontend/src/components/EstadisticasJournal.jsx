import ActividadSemanaChart from "./charts/ActividadSemanaChart" ;
import CategoriasChart from "./charts/CategoriasChart" ;
import TopRecomendadosChart from "./charts/TopRecomendadosChart" ;


function EstadisticasJournal({ items }){

  return(
    <section className="insightsPage mx-auto max-w-7xl px-6 pb-24 md:px-16">
      <div className="bg-[var(--color-pagina)] px-8 py-14 text-[var(--color-texto-pagina)] md:px-12">
        <div className="grid gap-14 md:grid-cols-[0.52fr_1.48fr]">
          <div className="insightsIntro md:sticky md:top-10 md:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[var(--color-titulo-pagina)]">Travel insights</p>
            <h2 className="mt-5 text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-[var(--color-acento)]">Datos de mi colección</h2>
            <p className="mt-8 max-w-sm text-base leading-8 text-[var(--color-texto-pagina)]">Una mirada visual a los lugares que he documentado y recomendado dentro de mi journal de viajes.</p>

            <div className="mt-10 border-l-2 border-[var(--color-acento)] pl-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-titulo-pagina)]">Insight note</p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-texto-pagina)]">Las gráficas cambian según los filtros activos del archivo, permitiéndome analizar categorías, estados o búsquedas específicas.</p>
            </div>

            <p className="mt-16 hidden text-xs font-bold uppercase tracking-[0.45em] text-[var(--color-titulo-pagina)] md:block">Page 03 / Travel insights</p>
          </div>

          <div className="insightsCharts border-l-0 border-[var(--color-acento)] md:border-l md:pl-14">
            <div className="mb-10 border-b border-[var(--color-acento)] pb-7">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-titulo-pagina)]">Visual archive</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">Estadísticas del journal</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-texto-pagina)]">Esta visualización utiliza únicamente los lugares visibles según los filtros aplicados en el archivo.</p>
            </div>

            <div className="grid gap-8">
              <ActividadSemanaChart items={items} />

              <div className="grid gap-8 xl:grid-cols-2">
                <CategoriasChart items={items} />
                <TopRecomendadosChart items={items} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) ;
}

export default EstadisticasJournal ;