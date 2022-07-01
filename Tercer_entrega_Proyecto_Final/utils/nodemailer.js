const nodemailer = require('nodemailer');
const adminConfig = require('./config/config.js');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const adminConfig = require('./config/config.js');
const { loggerConsole, loggerInfo, loggerError } = require('./logger/index');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user:
            'proyectofinalcoder@gmail.com',
        pass:
            'orzbtldznmpkulan'

    }
})


async function newRegister(newUser) {
    try {
        const mailPayload = {
            from: "Proyecto Final- Rossi Agustin",
            to: adminConfig.ADMIN_EMAIL,
            subject: "Nuevo usuario registrado",
            html: `
            <html>
            <body>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${newUser.name}</h5>
                        <p class="card-text">${newUser.email}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${newUser.address}</li>
                        <li class="list-group-item">${newUser.age}</li>
                        <li class="list-group-item">${newUser.phone}</li>
                    </ul>
                </div>
            </body>
        </html>`,
        }
        const mailInfo = await transporter.sendMail(mailPayload);
        loggerInfo.info(`Mail enviado a ${adminConfig.ADMIN_EMAIL}`)
    } catch (error) {
        loggerError.error(error)

    }
}


async function newPurchase(user, cart) {

    try {
        const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/cartList.hbs"), "utf8")
        const template = handlebars.compile(emailTemplateSource)
        const htmlToSend = template({ cart })

        const subjectString = `Nuevo pedido de ${user.name}. Email: ${user.email}`
        const mailPayload = {
            from: "Proyecto Final- Rossi Agustin",
            to: process.env.ADMIN_EMAIL,
            subject: subjectString,
            html: htmlToSend,
        };
        const mailInfo = await transporter.sendMail(mailPayload);
        const wppInfo = await adminWppMessage(subjectString)
        const customerSms = await smsClient(user.phone, `Hola ${user.name}! Su pedido ha sido recibido y está ahora en proceso. Gracias!`)
        return true
    }
    catch (error) {
        loggerError.error(error)

    }
}





module.exports = {
    newRegister,
    newPurchase
}