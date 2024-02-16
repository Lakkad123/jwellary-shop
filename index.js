const express = require("express")
const app = express()
const ejs = require("ejs")
const session = require("express-session")
const cookieparser = require("cookie-parser")
require("./database/jewllary.db")


const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieparser())
app.use(session({ secret: "vivek", cookie: { secure: false, maxAge: oneDay }, resave: false, saveUninitialized: true }))

const port = process.env.port || 5000
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const user = require("./router/user.routes")
app.use("/", user)

const admin = require("./router/admin.routes")
app.use("/admin", admin)

app.listen(port, () => { console.log(`server start at port: ${port}`) })