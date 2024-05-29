const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    email: String,
    password : String
});

const User = mongoose.model('Usuario', usersSchema);

module.exports = User;
// ojo usiario y user