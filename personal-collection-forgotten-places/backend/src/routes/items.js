const express = require("express") ;
const db = require("../db/database") ;

const router = express.Router() ;

router.get("/" , (req , res) => {
  try {
    const rows = db.prepare("SELECT * FROM items WHERE activo = 1 ORDER BY fechaRegistro DESC").all() ;

    const items = rows.map((item) => ({
      ...item ,
      activo: Boolean(item.activo) ,
      atributos: JSON.parse(item.atributos || "{}")
    })) ;

    res.json(items) ;
  }

  catch(error) {
    res.status(500).json({ error: error.message }) ;
  }
}) ;

router.post("/" , (req , res) => {
  const { nombre , categoriaId , estado , puntuacion = null , notas = "" , atributos = {} } = req.body ;

  if(!nombre || nombre.trim().length < 3){
    return res.status(400).json({ error: "El nombre debe tener al menos 3 caracteres" }) ;
  }

  if(!categoriaId){
    return res.status(400).json({ error: "La categoriaId es obligatoria" }) ;
  }

  if(!estado){
    return res.status(400).json({ error: "El estado es obligatorio" }) ;
  }

  if(puntuacion !== null && (Number(puntuacion) < 1 || Number(puntuacion) > 5)){
    return res.status(400).json({ error: "La puntuación debe estar entre 1 y 5 estrellas" }) ;
  }

  try {
    const nuevoItem = {
      id: crypto.randomUUID() ,
      nombre: nombre.trim() ,
      categoriaId ,
      estado ,
      puntuacion ,
      fechaRegistro: new Date().toISOString() ,
      fechaActividad: new Date().toISOString() ,
      notas ,
      atributos: JSON.stringify(atributos) ,
      activo: 1
    } ;

    db.prepare(`
      INSERT INTO items 
      (id , nombre , categoriaId , estado , puntuacion , fechaRegistro , fechaActividad , notas , atributos , activo)
      VALUES
      (@id , @nombre , @categoriaId , @estado , @puntuacion , @fechaRegistro , @fechaActividad , @notas , @atributos , @activo)
    `).run(nuevoItem) ;

    res.status(201).json({
      ...nuevoItem ,
      activo: true ,
      atributos
    }) ;
  }

  catch(error) {
    res.status(500).json({ error: error.message }) ;
  }
}) ;

router.put("/:id" , (req , res) => {
  const { nombre , categoriaId , estado , puntuacion = null , notas = "" , atributos = {} } = req.body ;

  try {
    const itemActual = db.prepare("SELECT * FROM items WHERE id = ? AND activo = 1").get(req.params.id) ;

    if(!itemActual){
      return res.status(404).json({ error: "Item no encontrado" }) ;
    }
    if(puntuacion !== null && (Number(puntuacion) < 1 || Number(puntuacion) > 5)){
      return res.status(400).json({ error: "La puntuación debe estar entre 1 y 5 estrellas" }) ;
    }

    const itemUpdated = {
      id: req.params.id ,
      nombre: nombre ?? itemActual.nombre ,
      categoriaId: categoriaId ?? itemActual.categoriaId ,
      estado: estado ?? itemActual.estado ,
      puntuacion ,
      fechaActividad: new Date().toISOString() ,
      notas: notas ?? itemActual.notas ,
      atributos: JSON.stringify(atributos) 
    } ;

    db.prepare(`
      UPDATE items
      SET nombre = @nombre,
          categoriaId = @categoriaId,
          estado = @estado,
          puntuacion = @puntuacion,
          fechaActividad = @fechaActividad,
          notas = @notas,
          atributos = @atributos
      WHERE id = @id
    `).run(itemUpdated) ;

    res.json({
      ...itemUpdated ,
      activo: true ,
      atributos
    }) ;
  }

  

  catch(error) {
    res.status(500).json({ error: error.message }) ;
  }
}) ;

router.delete("/:id" , (req , res) => {
  try {
    const result = db.prepare("UPDATE items SET activo = 0 WHERE id = ?").run(req.params.id) ;

    if(result.changes === 0){
      return res.status(404).json({ error: "Item no encontrado" }) ;
    }

    res.json({ message: "Item archivado correctamente" }) ;
  }

  catch(error) {
    res.status(500).json({ error: error.message }) ;
  }
}) ;

router.post("/:id/registro" , (req , res) => {
  const { fecha , valor , notas = "" } = req.body ;

  if(valor === undefined || valor === null){
    return res.status(400).json({ error: "El valor del registro es obligatorio" }) ;
  }

  try {
    const itemActual = db.prepare("SELECT * FROM items WHERE id = ? AND activo = 1").get(req.params.id) ;

    if(!itemActual){
      return res.status(404).json({ error: "Item no encontrado" }) ;
    }

    const nuevoRegistro = {
      id: crypto.randomUUID() ,
      itemId: req.params.id ,
      fecha: fecha || new Date().toISOString().split("T")[0] ,
      valor ,
      notas
    } ;

    db.prepare(`
      INSERT INTO registros 
      (id , itemId , fecha , valor , notas)
      VALUES
      (@id , @itemId , @fecha , @valor , @notas)
    `).run(nuevoRegistro) ;

    db.prepare("UPDATE items SET fechaActividad = ? WHERE id = ?").run(new Date().toISOString() , req.params.id) ;

    res.status(201).json(nuevoRegistro) ;
  }

  catch(error) {
    res.status(500).json({ error: error.message }) ;
  }
}) ;



module.exports = router ;