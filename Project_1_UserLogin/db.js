var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Project_1_UserLogin');

var userSchema = new mongoose.Schema({
    email: String,
    senha: String
}, { collection: 'users' });

module.exports = { Mongoose: mongoose, UserSchema: userSchema };