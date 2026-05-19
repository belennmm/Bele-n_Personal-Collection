import { useState, useEffect } from "react" ;
import { ThemeContext } from "./ThemeContext" ;

function ThemeProvider({ children }){

  const [tema , setTema ] = useState(() => {
    return localStorage.getItem("tema") || "oscuro" ;
  }) ;

  useEffect(() => {
    document.body.setAttribute("data-theme" , tema) ;
    localStorage.setItem("tema" , tema) ;
  } , [tema]) ;

  function toggleTema(){
    setTema((temaActual) => temaActual === "oscuro" ? "claro" : "oscuro") ;
  }

  return(
    <ThemeContext.Provider value={{ tema , setTema , toggleTema }}>
      {children}
    </ThemeContext.Provider>
  ) ;
}

export default ThemeProvider ;