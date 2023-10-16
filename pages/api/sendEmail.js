
export default async function handler(req, res) {
    // require('dotenv').config()

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "mail.jacada.co.ke",
        auth: {
            user: 'no-reply-website@jacada.co.ke',
            pass: 'LkQWx){K3c%3',
        },
        secure: true,
    });

    const mailData = {
        from: req.body.email,
        to: 'info@jacada.co.ke',
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
    }

    transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    })

    console.log(req.body)
    res.send('success')
}