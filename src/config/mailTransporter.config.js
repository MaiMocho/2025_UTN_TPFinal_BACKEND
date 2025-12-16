import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.config.js'

const mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: ENVIRONMENT.GMAIL_USER,
        pass: ENVIRONMENT.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    },
    family: 4,  
    debug: true,  
    logger: true  
})

export default mailTransporter