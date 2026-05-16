require("dotenv").config() ;

const express = require("express") ;
const cors = require("cors") ;
const itemsRouter = require("./routes/items") ;

const app = express() ;
const PORT = process.env.PORT || 3001 ;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
})) ;

app.use(express.json()) ;

app.get("/health" , (req , res) => {
  res.json({ status: "ok" , message: "Backend Forgotten Places CA funcionando" }) ;
}) ;

app.use("/api/items" , itemsRouter) ;

app.listen(PORT , () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`) ;
}) ;