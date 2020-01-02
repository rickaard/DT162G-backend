const mongoose = require('mongoose');

const snusSchema = new mongoose.Schema({
        // brand (produktmärke)
        brand: {
            type: String,
            required: true,
            min: 2,
            max: 255
        },
        // product
        product: {
            type: String,
            required: true,
            min: 2,
            max: 255
        },
        // snus type
        snusType: {
            type: String,
            min: 2,
            max: 255
        },
        // nikotin amount
        nicotineAmount: {
            type: String,
            min: 1,
            max: 255
        },
        // content/box
        amountPerBox: {
            type: String,
            min: 1,
            max: 255
        },
        // producer
        producer: {
            type: String,
            min: 1,
            max: 255
        },
        // misc
        misc: {
            type: String,
            max: 255
        },
        // date
        date: {
            type: Date,
            default: Date.now
        },
        // Approved status
        // 1 = waiting for apporoval
        // 2 = approved
        // 3 = denied
        status: {
            type: Number,
            default: 1
        }
});



module.exports = mongoose.model('Snus', snusSchema);