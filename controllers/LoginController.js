const {User} = require('../modelos');

class LoginController{
    index(req,res, next){
        res.locals.error='';
        res.locals.email='';
        res.render('login', {title: "NodePoP"});
    };

    async post(req,res, next){

        try{
            const {email, password}= req.body;
            const usuario = await User.findOne({ email: email})

            if(!usuario || !(await usuario.comparePassword(password))){
                res.locals.error = res.__('invalid credentials');
                res.locals.email= email;
                res.render('login', {title: "NodePoP"})
                return
            } 
            req.session.userId = usuario._id;
            

            res.redirect('/private')
        }catch (error) {
            next(error)
        }
    };

    logOut(req,res,next){
        req.session.regenerate(err =>{
           if (err) {
            next(err);
            return;
           } 
           res.redirect('/');
        })
    };
};

module.exports= LoginController;