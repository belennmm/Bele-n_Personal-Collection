require("dotenv").config() ;

const express = require("express") ;
const cors = require("cors") ;
const itemsRouter = require("./routes/items") ;

const app = express() ;
const PORT = process.env.PORT || 3001 ;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL
].filter(Boolean) ;

app.use(cors({
  origin: function(origin , callback){
    if(!origin || allowedOrigins.includes(origin)){ callback( null, true) ; }
    else {callback(new Error("No permitido por CORS"));
    }
  }
})) ;

app.use(express.json()) ;

app.get("/", ( req, res ) => {
  res.json({ message: "API Forgotten Places corriendo como flash" }) ;
}) ;

app.get("/health", ( req , res ) => {
  res.json({ status: "ok" , message: "Backend Forgotten Places activo" } );
}) ;

app.use("/api/items" , itemsRouter) ;

app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`) ;
}) ;