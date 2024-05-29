var express = require('express');
var router = express.Router();
const Articulo =require('../modelos/Articulo');


/* Get filtrado */

router.get('/',async(req, res, next) =>{
  

  try{
   
    const filter={};

    //filtro por nombre 

    const filterName= req.query.name;
    if (filterName) {
        filter.name = { $regex: new RegExp(`^${filterName}`, 'i') };
    };
    
    //filtro por tags, solo una.

    const filterTags = req.query.tags;
    if (filterTags && filterTags.length > 0) {
        filter.tags = { $in: filterTags };
    };
    
    // Filtro por venta si es true se vende si es false se busca

    const filterVenta = req.query.venta;
    if (filterVenta !== undefined) {
        filter.venta = filterVenta === 'true';
    };

    // ordenancion, filtros por campos y paginación

    const sort = req.query.sort;
    const field =req.query.field;
    const skip =req.query.skip;
    const limit=req.query.limit;

    const articulos =await Articulo.listar(filter,skip, limit, sort, field);
  
    res.render('index',{ anuncios: articulos, title: "NodePoP" });

  }catch(error){
      next(error)
  }
});




module.exports = router;
