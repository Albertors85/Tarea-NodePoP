var express = require('express');
var router = express.Router();
const Articulo =require('../../modelos/Articulo');
const upload = require('../../lib/uploadController');

//Get devuelve los anuncios filtrados

router.get('/',async(req, res, next) =>{
    try{
        const  userId = req.apiIdUser;
        const filter={};

        filter.owner = userId;
        //filtro por nombre y venta
        const filterName= req.query.name;
        if (filterName) {
            filter.name = filterName;
        };
        
        const filterTags = req.query.tags;
        if (filterTags && filterTags.length > 0) {
            filter.tags = { $in: filterTags };
        };
        
       // Filtro por venta 
       const filterVenta = req.query.venta;
       if (filterVenta !== undefined) {
           filter.venta = filterVenta === 'true';
       };
        // ordenancion
        const sort = req.query.sort;

        // filtrar por campos
        const field =req.query.field;

        //paginacion
        const skip =req.query.skip;
        const limit=req.query.limit;
        const articulos =await Articulo.listar(filter,skip, limit, sort, field);
        
        res.json({ anuncios: articulos });

    }catch(error){
        next(error)
    }
});

//Post crea anuncios

router.post('/',upload.single('foto'), async(req,res,next)=>{
    try{
        const data =req.body;
        // creamos una instancia de articulo en memoria
        const articulo = new Articulo(data);
        articulo.foto = req.file.filename;
        // lo guardamos en la base de datos
        const articuloGuardado = await articulo.save();

        res.json({articuloGuardado});
    }catch(error){
        next(error);
    } 
});

//delete
// elimina todos
router.delete('/:id', async(req,res,next)=>{
    try{
        const id =req.params.id;
        await Articulo.deleteOne({_id:id});
        res.json();
    }catch(error){
        next(error);
    }

});

module.exports = router;
