const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = new mongoose.Schema({
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
    },
    token: {
        type: String,
        required: true
    }

},
    { timestamps: true, versionKey: false })



user.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
})
user.methods.genrateToken = async function () {
    const token = await jwt.sign({ _id: this._id }, "secret")
    this.token = token
    return token
}
module.exports = mongoose.model("user", user)   