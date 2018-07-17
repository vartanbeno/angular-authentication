const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;