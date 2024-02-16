const User = require("../model/user.model")
const product = require("../model/product.model")
const order = require("../model/order.model")
const { mailSender } = require("../helper/mail.helper")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const auth = require("../middleware/token")
const url = require("url")
exports.register = async (req, res) => {

    res.render("register")
}

exports.home = async (req, res) => {
    res.render("home")
}

exports.product = async (req, res) => {
    const data = await product.find({ category: "Bracelates" })
    res.render("product", { data: data })
}

exports.prodoct1 = async (req, res) => {
    const data = await product.find({ category: "Necklace" })
    res.render("prod1", { data: data })
}
exports.product2 = async (req, res) => {
    const data = await product.find({ category: "Earrings" })
    res.render("prod2", { data: data })
}
exports.about = async (req, res) => {
    res.redner("about")
}
exports.contact = async (req, res) => {
    res.render("contact")
}
exports.logout = async (req, res) => {
    req.session.destroy()
    res.clearCookie("jwt")
    res.redirect("/login")
}

exports.adminlogin = async (req, res) => {
    res.render("adminlogin")
}
exports.insertUser = async (req, res) => {
    try {
        const userFind = await User.findOne({ email: req.body.email })
        if (userFind) {
            await mailSender(req.body.email, "already")
            res.render("register.ejs", { message: "User already exist" })
        }
        else {
            const data = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            })
            const token = await data.genrateToken()
            res.clearCookie("jwt")
            res.cookie("jwt", token,
                {
                    expires: new Date(new Date().getTime() + 1000 * 60 * 60),
                    httpOnly: true
                })
            await mailSender(req.body.email, "signup")
            await data.save()
            await res.status(200).json(res.redirect("home"))
            console.log(req.cookies);
        }
    } catch (err) {
        res.status(500).json({
            message: `"Error :User Insert-" ${err.message}`,
            Response: 500,
        })
    }

}


exports.login = async (req, res) => {
    try {
        console.log(req.user);
        res.render("index")

    } catch (error) {
        console.log(error.message);
    }

}
exports.thankYou = async (req, res) => {
    console.log(req.query.id);
    const data = await order.findOne({ _id: req.query.id })
    res.render("thankyou", { data: data })

}

exports.loginCheck = async (req, res) => {
    const userFind = await User.findOne({ email: req.body.email })
    if (userFind) {
        const passwordMatch = await bcrypt.compare(req.body.password, userFind.password)
        if (passwordMatch) {
            const token = await userFind.genrateToken()
            await res.clearCookie("jwt")
            await res.cookie("jwt", token,
                {
                    expires: new Date(new Date().getTime() + 1000 * 60 * 60),
                    httpOnly: true
                })
            await User.findOneAndUpdate({ email: req.body.email }, { $set: { token: token } })

            // req.session.name = userFind.name
            // req.session.email = userFind.email
            // req.session.phoneNumber = userFind.phoneNumber
            // req.session.address = userFind.address
            // req.session.save()
            await mailSender(req.body.email, "login")
            res.render("home")
        } else {
            res.status(500).json(res.render("index", { message: "User Credential not match" }))

        }
    } else {
        res.status(500).json(res.render("index", { message: "User Credential not match" }))

    }
}
exports.addCart = async (req, res) => {
    try {
        const id = req.query.poid
        const data = await product.findById({ _id: id })

        res.render("addtocart", { data: data, session: req.user })

    } catch (error) {
        console.log("Error in addtocart", error.message);
    }


}
exports.insertOrder = async (req, res) => {
    try {

        const id = req.body.id
        const data = await product.findById({ _id: id })
        const OrderData = await new order({
            name: req.user.name,
            email: req.user.email,
            phoneNumber: req.user.phoneNumber,
            address: req.user.address,
            productName: data.name,
            price: data.price,
            total: data.price * req.body.addbtn,
            date: new Date().toISOString(),
            quantity: req.body.addbtn,
            image: data.image
        })
        const saveData = await OrderData.save()
        mailSender(saveData.email, "order", saveData)
        res.redirect(url.format({
            pathname: "/thankYou",
            query: {
                id: `${saveData.id}`
            }
        }))
    } catch (error) {
        console.log("Error in insertOrder", error.message);

    }
}
