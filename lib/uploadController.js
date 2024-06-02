const multer = require('multer');
const path = require('node:path')

const storage  = multer.diskStorage({
    destination: function(req,file,callback){
        const dir = path.join(__dirname, '..','public', 'foto');  
         callback(null, dir);
    },
    filename: function(req,file, callback){
        try{

            const fileName= `${file.fieldname }--${Date.now()}--${file.originalname}`;
            callback(null,fileName);

        }catch(error){
            callback(error);
        }
        
    },
})

const upload = multer({storage: storage});

module.exports = upload;