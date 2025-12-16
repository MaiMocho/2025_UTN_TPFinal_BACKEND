import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.config.js'

const mailTransporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: ENVIRONMENT.GMAIL_USER,
        pass: ENVIRONMENT.GMAIL_PASSWORD
    },
    family: 4 
})

export default mailTransporter