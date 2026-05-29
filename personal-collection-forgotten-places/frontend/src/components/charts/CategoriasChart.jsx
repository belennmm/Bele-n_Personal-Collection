import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts" ;
import { CATEGORIAS } from "../../utils/categorias" ;


function CategoriasChart({ items }){

  const datosCategorias = CATEGORIAS.map((categoria) => {
    const cantidad = items.filter((item) => item.categoriaId === categoria.id).length ;

    return {
      nombre: categoria.nombre ,
      cantidad ,
      color: categoria.color
    } ;
  }).filter((categoria) => categoria.cantidad > 0) ;

  return(
    <article className="chartPage border border-[var(--color-acento)] p-6">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-titulo-pagina)]">Categorías</p>
        <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-[var(--color-texto-pagina)]">Distribución de lugares</h3>
        <p className="mt-3 text-sm leading-6 text-[var(--color-texto-pagina)]">Cantidad de forgotten places registrados según su tipo de exploración.</p>
      </div>

      {datosCategorias.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center text-center">
          <p className="max-w-xs text-sm leading-7 text-[var(--color-texto-pagina)]">No hay lugares disponibles para representar con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={datosCategorias} dataKey="cantidad" nameKey="nombre" cx="50%" cy="45%" outerRadius={92} innerRadius={42} paddingAngle={3}>
                {datosCategorias.map((categoria) => (
                  <Cell key={categoria.nombre} fill={categoria.color} />
                ))}
              </Pie>

              <Tooltip contentStyle={{ backgroundColor: "var(--color-pagina)" , border: "1px solid var(--color-acento)" , color: "var(--color-texto-pagina)" }} />
              <Legend wrapperStyle={{ fontSize: "12px" , textTransform: "uppercase" , letterSpacing: "0.1em" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  ) ;
}

export default CategoriasChart ;