const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://vivek:123@cluster0.1i6bbng.mongodb.net/?retryWrites=true&w=majorit")
    .then(() => {
        console.log("connected with jwellary database");
    }).catch((err) => {
        console.log("database error :", err);
    })