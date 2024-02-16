const multer = require("multer")
const path = require("path")
const admin = require("../model/admin.model")
const user = require("../model/user.model")
const product = require("../model/product.model")
const order = require("../model/order.model")
//For Add New Admin Insert
exports.insertAdmin = async (req, res) => {
    try {
        const adminFind = await admin.findOne({ email: req.body.email })
        if (adminFind) {
            res.status(500).json(res.render("register.ejs", { message: "User already exist" }))
        }
        else {
            const data = admin({
                //Enter Detail Using Postman
                // name: req.body.name,
                // email: req.body.email,
                // password: req.body.password,
                // phoneNumber: req.body.phoneNumber,
                // address: req.body.address

                //write details manually
                // name: Admin name,
                // email:Admin email,
                // password: Admin password,
                // phoneNumber: Admin phoneNumber,
                // address: Admin address


            })
            const saveData = await data.save()

            req.session.save()
            await res.status(200).json(res.redirect("home"))

        }

    } catch (err) {
        res.status(500).json({
            message: `"Error :Admin Insert-" ${err.message}`,
            Response: 500,
        })
    }

}
exports.adminLogin = async (req, res) => {
    res.render("adminlogin")
}
exports.addProduct = async (req, res) => {
    res.render("addproduct")
}
exports.adminHome = async (req, res) => {
    const productRecords = await product.find()
    // const product=await print.find()
    const userRecords = await user.find()
    const orderRecords = await order.find().sort({ _id: -1 })
    res.render("admin", { product: productRecords, user: userRecords, order: orderRecords })
}
exports.adminLoginCheck = async (req, res) => {
    const adminFind = await admin.findOne({ email: req.body.email, password: req.body.password })
    if (adminFind) {

        await res.status(200).json(res.redirect("/admin"))
    } else {
        res.status(500).json(res.render("adminlogin", { message: "User Credential not match" }))

    }
}
const storage = multer.diskStorage(
    {
        destination: "./public/images",
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        }
    }
)
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000000000000 },
    fileFilter: function (req, file, cb) {
        checktype(file, cb)
    }
}).single("file")
function checktype(file, cb) {
    const filetypes = /png|jpg|gif|jpeg/;
    const ext = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && ext) {
        return cb(null, true);
    } else {
        cb("Error :Type Not Support");
    }
}
exports.insertProduct = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log("enterdindex");
                console.log(err.message);
                res.status(200).redirect("addproduct", { msg: err.message })
            }
            else {
                try {
                    console.log(req.file);
                    if (req.file == undefined) {
                        res.status(200).render("addproduct", { msg: "Please Select Image" })
                        console.log("enterd pls");

                    } else {
                        // console.log(req.file);
                        console.log(req.body);
                        console.log("enterd");
                        res.status(200).render("addproduct", { msg: "Product Uploaded Sucessfully", file: req.file.filename })
                        const imgPath = "/images/" + req.file.filename;
                        const data = product({

                            name: req.body.pname,
                            price: req.body.pprice,
                            description: req.body.pdetaile,
                            category: req.body.pcategory,
                            image: imgPath
                        })
                        const saveData = await data.save()
                        console.log(saveData);

                    }
                } catch (error) {
                    console.log(error.message);

                }


            }
        })



    } catch (err) {
        console.log(err.message);

    }



}
exports.findBracelates = async (req, res) => {
    try {
        const data = await product.find({ category: "Bracelates" })
        res.send(data)
    }

    catch (err) {
        console.log("Error in find Bracelates:", err.message);
    }
}

exports.findNecklace = async (req, res) => {
    try {
        const data = await product.find({ category: "Necklace" })
        console.log(data);
    }

    catch (err) {
        console.log("Error in find Necklace:", err.message);
    }
}

exports.findEarrings = async (req, res) => {
    try {
        const data = await product.find({ category: "Earrings" })
        console.log(data);
    }

    catch (err) {
        console.log("Error in find Earrings:", err.message);
    }
}


exports.deleteData = async (req, res) => {
    try {

        if (req.query.delete == "product") {
            console.log("enterda");
            const id = req.query.id
            await product.findByIdAndDelete({ _id: id })
            res.status(200).redirect("/admin")

        }
        else if (req.query.delete == "user") {

            const id = req.query.id
            await user.findByIdAndDelete({ _id: id })
            res.status(200).redirect("/admin")

        }
        else if (req.query.delete == "order") {
            const id = req.query.id
            await order.findByIdAndDelete({ _id: id })
            res.status(200).redirect("/admin")

        }
    } catch (error) {
        console.log("Error in delete", error.message);
    }

}
exports.updateProduct = async (req, res) => {
    const data = await product.findOne({ _id: req.query.id })
    res.render("updateProduct", { data: data })
}
exports.changeProduct = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log(err.message);
                res.status(200).json(res.redirect("/admin"))
            }
            else {
                try {
                    console.log(req.file);
                    if (req.file == undefined) {
                        res.status(200).json(res.redirect("/admin"))
                        console.log("enterd pls");
                        const data = await product.findByIdAndUpdate({ _id: req.body.id }, {
                            $set: {

                                name: req.body.pname,
                                price: req.body.pprice,
                                description: req.body.pdetaile,
                                category: req.body.pcategory,

                            }
                        })

                    } else {
                        // console.log(req.file);
                        console.log(req.body);
                        console.log("enterd");
                        res.status(200).json(res.redirect("/admin"))
                        const imgPath = "/images/" + req.file.filename;
                        const data = await product.findByIdAndUpdate({ _id: req.body.id }, {
                            $set: {

                                name: req.body.pname,
                                price: req.body.pprice,
                                description: req.body.pdetaile,
                                category: req.body.pcategory,
                                image: imgPath
                            }
                        })


                    }
                } catch (error) {
                    console.log(error.message);

                }


            }
        })



    } catch (err) {
        console.log(err.message);

    }

}