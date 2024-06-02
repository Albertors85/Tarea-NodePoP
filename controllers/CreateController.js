const {Articulo} = require('../modelos');

class CreateController {
 

    newAdvert(req,res,next){
        res.locals.error='';
        res.render('create-advert',{ title: "NodePoP"});

    }

    async postCreate(req,res,next){
        try{
            // intentar coger todas a la vez
            const {name, venta, precio, foto, tags,owner}= req.body
            const userId = req.session.userId; 

            const articulo = new  Articulo({
                name: name,
                venta: venta,
                precio: precio,
                foto: foto,
                tags: tags,
                owner: userId

            });
            const articuloGuradado = await articulo.save();
            // no es necesario el save
            res.redirect('/private');

        }catch(error){
            next(error);
        }
    }
};

module.exports = CreateController;