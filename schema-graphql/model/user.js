const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        match: /^[a-zA-Z ]+$/
    },
    username: {
        type: String,
        unique: true,
        description: 'Username must be unique',
        default: null
    },
    phone: {
        type: String,
        unique: true,
        match: /[0-9]{10}/
    },
    email: {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: {
        type: String
    }

}, {
    timestamps: true
});

module.exports = model('User', UserSchema)