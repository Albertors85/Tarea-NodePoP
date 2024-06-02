var createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports= (req,res,next)=>{
    const tokenJwt = req.get('Authorization') || req.body.jwt || req.query.jwt// autho vs authorization
   
    if(!tokenJwt){
        next(createError(401,res.json({
            error: 'No estas autentificado'
        })));
        return;
    };

    jwt.verify(tokenJwt,'jvhyxptIfNKpgAph9Xxs', (err, payload)=>{
        if (err){
            if (err.name === 'TokenExpiredError'){
               next(createError(401, res.json({
                error: 'Token expirado',

               })));
            return; 
            }else{
                next(createError(401, res.json({
                    error: 'No tienes acceso'
                })));
                return;
            }
            
        }


        req.apiIdUser =payload.userId;
        next();
    });
};
