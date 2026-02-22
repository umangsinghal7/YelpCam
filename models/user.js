const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose.default);  // adds username and password fields, and also adds some methods to the User model for authentication

module.exports = mongoose.model('User', UserSchema);
