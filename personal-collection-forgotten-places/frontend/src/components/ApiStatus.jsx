import useFetch from "../hooks/useFetch" ;


function ApiStatus({ apiUrl , activo }){

  const {data, loading , error} = useFetch(`${apiUrl }/api/items`, {} ,activo) ;

  if(!activo){ return null ;}

  return(
    <div className = "mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">

      <span
        className={`h-2 w-2 rounded-full ${
          
          loading
          ? "bg-yellow-500"
          : error
          ? "bg-red-500 "
          : "bg-green-500"
        }` } />

      <span className = "text-[var(--color-acento)]" >

        {loading && "Conectando"}
        {!loading && error && "API no disponible"}
        {!loading && !error && data && " API conectada"}

      </span>

    </div>
  ) ;
}

export default ApiStatus ;