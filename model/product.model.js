const mongoose = require("mongoose")

const product = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "prodcuct name must be required"
        }, price: {
            type: Number,
            required: "prodcuct price must be required"
        }, description: {
            type: String,
            required: "prodcuct description must be required"
        }, category: {
            type: String,
            enum: ["Bracelates", "Necklace", "Earrings"],
            required: "Please enter valid category"
        }, image: {
            type: String,
            required: "Select a valid image"
        },



    },
    { timestamps: true, versionKey: false }
)

module.exports = mongoose.model("products", product)