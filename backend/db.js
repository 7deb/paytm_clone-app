const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 8,
        trim: true,
        maxlength: 40,
    },
    firstname: {
        type: String,
        minlength: 8,
        maxlength: 40,
        trim: true,
        required: true,
    },
    lastname: {
        type: String,
        minlength: 8,
        maxlength: 40,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
})

const User = mongoose.model('user', userSchema);

module.exports = {
    User,
}
