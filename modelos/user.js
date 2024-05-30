const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = mongoose.Schema({
    email: String,
    password : String
});

usersSchema.statics.hashPassword = function(passwordEntera){
    return bcrypt.hash(passwordEntera, 7);
};

usersSchema.methods.comparePassword = function(passEntera){
    return bcrypt.compare(passEntera, this.password);
};



const User = mongoose.model('Usuario', usersSchema);

module.exports = User;
// ojo usiario y user