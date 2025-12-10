import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.config.js'

const mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,            
    secure: false,   
    auth: {
        user: ENVIRONMENT.GMAIL_USER,
        pass: ENVIRONMENT.GMAIL_PASSWORD //hola
    },
    family: 4,             
    connectionTimeout: 10000, 
    greetingTimeout: 5000
})

export default mailTransporter