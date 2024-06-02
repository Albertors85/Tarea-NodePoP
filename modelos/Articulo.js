const mongoose =require('mongoose');

const productSchema = mongoose.Schema({
    name : { type: String, required:true, index:true},
    venta : {type: Boolean, index:true},
    precio : {type: Number, required: true},
    foto: String,
    tags:[String],
    owner: {ref: 'Usuario', type: mongoose.Schema.ObjectId}

    
});

productSchema.statics.listar= function(filtro,skip,limit, sort,field){
    const query = Articulo.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(field);

    
    return query.exec()

};

const Articulo = mongoose.model('Articulo', productSchema);

module.exports = Articulo;