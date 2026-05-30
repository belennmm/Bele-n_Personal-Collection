import { useMemo, memo } from "react" ;
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts" ;

function ActividadSemanaChart({ items }){

    const datosSemana = useMemo(() => Array.from({ length: 7 } , (_ , indice) => {
    const fecha = new Date() ;
    fecha.setDate(fecha.getDate() - (6 - indice)) ;

    const fechaString = fecha.toISOString().split("T")[0] ;

    const recomendaciones = items.reduce((total , item) => {
      const registrosDelDia = (item.registros || []).filter((registro) =>
        registro.fecha === fechaString && Number(registro.valor) === 1
      ) ;

      return total + registrosDelDia.length ;
    } , 0) ;

    const correcciones = items.reduce((total , item) => {
      const registrosDelDia = (item.registros || []).filter((registro) =>
        registro.fecha === fechaString && Number(registro.valor) === -1
      ) ;

      return total + registrosDelDia.length ;
    } , 0) ;

    return {
      fecha: fecha.toLocaleDateString("es-GT" , { day: "2-digit" , month: "short" }) ,
      recomendaciones ,
      correcciones
    } ;
  }) , [items]) ;

  return(
    <article className="chartPage border border-[var(--color-acento)] p-6">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-titulo-pagina)]">Últimos 7 días</p>
        <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-[var(--color-texto-pagina)]">Movimiento de recomendaciones</h3>
        <p className="mt-3 text-sm leading-6 text-[var(--color-texto-pagina)]">Recomendaciones agregadas y correcciones realizadas en mi colección.</p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={datosSemana} margin={{ top: 10 , right: 10 , left: -18 , bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-acento)" opacity={0.18} />
            <XAxis dataKey="fecha" tick={{ fill: "var(--color-texto-pagina)" , fontSize: 12 }} axisLine={{ stroke: "var(--color-acento)" }} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fill: "var(--color-texto-pagina)" , fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "var(--color-pagina)" , border: "1px solid var(--color-acento)" , color: "var(--color-texto-pagina)" }} />
            <Legend wrapperStyle={{ fontSize: "12px" , textTransform: "uppercase" , letterSpacing: "0.12em" }} />
            <Bar dataKey="recomendaciones" name="Recomendaciones" fill="var(--color-acento)" radius={[4 , 4 , 0 , 0]} />
            <Bar dataKey="correcciones" name="Correcciones" fill="var(--color-acento-secundario)" radius={[4 , 4 , 0 , 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  ) ;
}

export default memo(ActividadSemanaChart) ;