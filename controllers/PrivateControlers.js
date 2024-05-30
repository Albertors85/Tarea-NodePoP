const {User} = require('../modelos');
const createError = require('http-errors');

class PrivateControllers {

    async index(req,res,next){
        try{

            const userId = req.session.userId;
            const usuario = await User.findById(userId);

            if(!usuario){
                next(createError(500, __('user not found')))
                return
            };

            res.render('private', {title: "NodePoP", email: usuario.email})

        }catch(error){
            next(error)
        }
        
    };
};
module.exports = PrivateControllers;