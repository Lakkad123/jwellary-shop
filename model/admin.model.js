const mongoose = require("mongoose")

const admin = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:
    {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
},
    { timestamps: true, versionKey: false })


module.exports = mongoose.model("admin", admin)