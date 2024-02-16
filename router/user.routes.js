
const router = require("express").Router();
const auth = require("../middleware/token")
const {
    insertUser,
    register,
    home,
    product,
    prodoct1,
    product2,
    about,
    contact,
    logout,
    login,
    adminlogin,
    loginCheck,
    addCart,
    thankYou,
    insertOrder,
    fetchData
} = require("../controller/user.controller")


router.get("/", register)
router.post("/insert", insertUser)
router.get("/home", auth, home)
router.get("/index", login)
router.get("/product", auth, product)
router.get("/prod1", auth, prodoct1)
router.get("/prod2", auth, product2)
router.get("/about", auth, about)
router.get("/contact", auth, contact)
router.get("/logout", logout)
router.get("/login", login)
router.get("/register", auth, register)
router.get("/adminlogin", adminlogin)
router.get("/addtocart", auth, addCart)
router.post("/loginCheck", loginCheck)
router.get("/addcart", auth, addCart)
router.get("/thankyou", auth, thankYou)
router.post("/insertOrder", auth, insertOrder)
module.exports = router 