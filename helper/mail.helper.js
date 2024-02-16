const { convert } = require("html-to-text")
const fs = require("fs")
var nodemailer = require('nodemailer');

exports.mailSender = async (to, type, orderInfo) => {
    if (type == "signup") {
        var data = fs.readFileSync("./mailtemplates/signup.html", { encoding: 'utf-8' })
        var text = convert(data)
        var subject = "SignUp with jewellery"
    } else if (type == "login") {
        var data = fs.readFileSync("./mailtemplates/login.html", { encoding: 'utf-8' })
        var text = convert(data)
        var subject = "Login Sucessfully in vivek Jewellery"

    } else if (type == "order") {
        var data = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thankyou</title>
        </head>
        <body class="alert-success">
            
                <div style="padding-left: 26px;padding-top: 102px;width:98%;">
                    <h1 style="border-bottom: 4px solid red;padding-bottom: 6px;"  class="text-center">You Order Conform...</h1>
                    <br>
                </div><br>
                <div class="row">
               
                <div class="col-3 mb-3 m-3">
                    <div class="card" style="width:100%;border:2px solid black;margin-left:2%;">
                        <div class="card-body" >
                            <h5 class="card-title">Name:${orderInfo.name}</h5>
                            <h5 class="card-title">Date:${orderInfo.date}</h5>
                            <p class="card-text">Order : ${orderInfo.productName}</p>
                            <p class="card-text">Address : ${orderInfo.address}</p>
                            <p class="card-text">Qty : ${orderInfo.quantity}</p>
                            <p class="card-text">Price : ${orderInfo.price}</p>
                            <hr><p class="card-text">Total : ${orderInfo.total}</p></hr>
                            <a href="#" class="btn btn-primary">Complete Order</a>
                        </div>
                    </div>
                </div>
        
                </div>
        </body>
        </html>`
        var text = convert(data)
        var subject = "Order Placed Sucessfully in vivek Jewellery"

    }
    else {
        var data = fs.readFileSync("./mailtemplates/already.html", { encoding: 'utf-8' })
        var text = convert(data)
        var subject = "User Already Exist   "

    }
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'viveklakkad2323@gmail.com',
            pass: 'rnox kejn inso uhpw'
        }
    });

    var mailOptions = {
        from: 'viveklakkad2323@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}