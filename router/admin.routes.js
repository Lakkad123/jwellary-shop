const router = require("express").Router()
const {
    adminLogin,
    insertAdmin,
    adminLoginCheck,
    addProduct,
    adminHome,
    insertProduct,
    findEarrings,
    findNecklace,
    deleteData,
    updateProduct,
    changeProduct
} = require("../controller/admin.controller")

router.post("/loginCheck", adminLoginCheck)
router.post("/insert", insertAdmin)
router.get("/login", adminLogin)
router.get("/addproduct", addProduct)
router.get("/", adminHome)
router.post("/insertProduct", insertProduct)
router.get("/findEarrings", findEarrings)
router.get("/findNecklace", findNecklace)
router.get("/delete", deleteData)
router.get("/updateProduct", updateProduct)
router.post("/changeProduct", changeProduct)
module.exports = router