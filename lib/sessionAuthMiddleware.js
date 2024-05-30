module.exports = (req, res, next)=>{
    if(!req.session.userId ){
        res.redirect('/login');
        return;
    }
    next(); //deja pasar al siguiente midleware
}