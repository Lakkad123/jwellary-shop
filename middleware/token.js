const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (token) {
            const decode = await jwt.verify(token, "secret")
            const data = await userModel.findById({ _id: decode._id })
            if (data) {
                req.user = data
                if (token == data.token) {
                    next();
                } else {
                    res.status(501).render("index", { message: "Please Login Or SignUp Again" })
                }
            }
        } else {
            res.status(501).render("index", { message: "Please Login Or SignUp Again" })
        }
    } catch (error) {

        res.status(501).render("index", { message: "Please Login Or SignUp Again" })

    }
}

module.exports = auth