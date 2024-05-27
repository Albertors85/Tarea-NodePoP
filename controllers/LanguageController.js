class LanguajeController{
    changeLocale(req, res, next){
        const locale = req.params.locale
        res.cookie('nodePoP-locale', locale,{
            maxAge: 1000*60*60*24*30// un segundo, minuto, hora, horas dia y mes
        });
        res.redirect('back')
    }
}

module.exports = LanguajeController