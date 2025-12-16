import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.config.js'

const mailTransporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: 'el_email_con_que_te_registraste@gmail.com',
        pass: 'la_clave_larga_que_te_dio_brevo'
    }
})
export default mailTransporter