const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 2,
        max: 1024
    }
});
module.exports = mongoose.model('Admin', adminSchema);