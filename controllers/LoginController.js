class LoginController{
    index(req,res, next){
        res.render('login', {title: "NodePoP"});
    }

};

module.exports= LoginController;