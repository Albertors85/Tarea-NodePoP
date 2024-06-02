const {User, Articulo} = require('../modelos');
const jwtToken = require('jsonwebtoken');

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


    async postApiJWT(req,res,next){
        
        try{
            const {email, password}= req.body;
            const usuario = await User.findOne({email: email});
            
            if(!usuario || !(await usuario.comparePassword(password))){
                res.json({error:'invalid pruebaaa'});
                return;
            }
            
            const tokenUser= await jwtToken.sign({userId: usuario._id},'jvhyxptIfNKpgAph9Xxs', {
                expiresIn: '1h'})

            res.json({
                tokenUser : tokenUser
            });
            
        }catch(error){
            next(error)
        }
        
    }
};

module.exports= LoginController;