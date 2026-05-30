
import { useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import useLocalStorage from "../hooks/useLocalStorage";


function ThemeProvider({ children }) {
  const [tema , setTema] = useLocalStorage("tema" , "oscuro") ;

  useEffect(() =>{ document.body.setAttribute("data-theme", tema ); } , [tema]) ;

  function toggleTema(){
    setTema((temaActual) => temaActual ===  "oscuro" ? "claro" : "oscuro");
  }

  return(
    <ThemeContext.Provider value={{tema , toggleTema } }>
      { children}

    </ThemeContext.Provider>
  );
}

export default ThemeProvider ;