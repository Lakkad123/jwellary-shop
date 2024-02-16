const mongoose = require("mongoose")
const order = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }, name: {
        type: String,
        required: true
    }, phoneNumber: {
        type: Number,
        required: true
    }, address: {
        type: String,
        required: true
    }, productName: {
        type: String,
        required: true
    }, price: {
        type: Number,
        required: true
    }, quantity: {
        type: Number,
        required: true
    }, total: {
        type: Number,
        required: true
    }, date: {
        type: Date,
        required: true
    }, image: {
        type: String,
        required: true
    }
}, { versionKey: false })


module.exports = mongoose.model("order", order)