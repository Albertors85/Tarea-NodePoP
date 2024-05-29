class PruebaControll {
    index(req,res,next){
        res.render('features-vacio',{ color: req.session.color });
    }
};

module.exports = PruebaControll;