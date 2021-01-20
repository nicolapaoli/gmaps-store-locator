const { mongo } = require('mongoose');
const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    storeName: String,
    phoneNumber: String,
    address: {},
    openStatusText: String,
    addressLines: Array,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
})

storeSchema.index({ location: "2dsphere" })

module.exports = mongoose.model('Store', storeSchema)