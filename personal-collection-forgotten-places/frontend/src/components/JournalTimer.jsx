import { useState, useEffect, useRef } from "react" ;


function JournalTimer(){

  const [segundos , setSegundos ] =  useState(0) ;

  const intervaloRef = useRef(null) ;

  useEffect(() => {
    intervaloRef.current = setInterval(() => { setSegundos((tiempoActual) => tiempoActual + 1) ; } , 1000) ;

    return () => { clearInterval(intervaloRef.current) ; } ;
  } , []) ;

  const minutos = String(Math.floor(segundos / 60)).padStart(2 , "0") ;
  const segundosRestantes = String(segundos % 60).padStart(2 , "0") ;

  return(
    <div className="journalSession flex justify-center pb-8">
      <div className="rounded-full border border-[var(--color-acento)] px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-acento)]">
        Journal session / {minutos}:{segundosRestantes}
      </div>
    </div>
  ) ;
}

export default JournalTimer ;