import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts" ;


function TopRecomendadosChart({ items }){

  const datosRecomendaciones = items.map((item) => {
    const totalRecomendaciones = (item.registros || []).reduce((total , registro) =>
      total + Number(registro.valor)
    , 0) ;

    return {
      nombre: item.nombre ,
      recomendaciones: totalRecomendaciones < 0 ? 0 : totalRecomendaciones
    } ;
  }).sort((a , b) => b.recomendaciones - a.recomendaciones).slice(0 , 5) ;

  return(
    <article className="chartPage border border-[var(--color-acento)] p-6">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-titulo-pagina)]">Original chart</p>
        <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-[var(--color-texto-pagina)]">Lugares más recomendados</h3>
        <p className="mt-3 text-sm leading-6 text-[var(--color-texto-pagina)]">Ranking personal de los destinos que más he recomendado dentro de mi colección.</p>
      </div>

      {datosRecomendaciones.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center text-center">
          <p className="max-w-xs text-sm leading-7 text-[var(--color-texto-pagina)]">No hay lugares disponibles para representar con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datosRecomendaciones} layout="vertical" margin={{ top: 10 , right: 18 , left: 30 , bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-acento)" opacity={0.18} />
              <XAxis type="number" allowDecimals={false} tick={{ fill: "var(--color-texto-pagina)" , fontSize: 12 }} axisLine={{ stroke: "var(--color-acento)" }} tickLine={false} />
              <YAxis type="category" dataKey="nombre" width={105} tick={{ fill: "var(--color-texto-pagina)" , fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "var(--color-pagina)" , border: "1px solid var(--color-acento)" , color: "var(--color-texto-pagina)" }} />
              <Legend wrapperStyle={{ fontSize: "12px" , textTransform: "uppercase" , letterSpacing: "0.12em" }} />
              <Bar dataKey="recomendaciones" name="Recomendaciones netas" fill="var(--color-acento)" radius={[0 , 5 , 5 , 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  ) ;
}

export default TopRecomendadosChart ;