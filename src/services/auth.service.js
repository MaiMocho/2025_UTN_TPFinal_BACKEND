import ENVIRONMENT from "../config/environment.config.js";
import mailTransporter from "../config/mailTransporter.config.js";
import { ServerError } from "../error.js";
import UserRepository from "../repositories/user.repository.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

class AuthService {
    static async register(email, password, name){

        console.log("Intentando registrar:", email, name)
        const user = await UserRepository.getByEmail(email)
        
        if(user){
            throw new ServerError(400, 'Email ya en uso')
        }
    
        const password_hashed = await bcrypt.hash(password, 12)

        const user_created = await UserRepository.create(name, email, password_hashed)
        const user_id_created = user_created._id

        const verification_token = jwt.sign(
            { user_id: user_id_created },
            ENVIRONMENT.JWT_SECRET,
            { expiresIn: '1d' }
        )

        const verificationLink = `${ENVIRONMENT.URL_BACKEND}/api/auth/verify-email/${verification_token}`

        try {
            const info = await mailTransporter.sendMail({
                from: '"Matsu App" <no-reply@matsu.dev>',
                to: email,
                subject: 'Verifica tu cuenta de mail',
                html: `
                    <h1>Hola ${name}</h1>
                    <p>Por favor verifica tu cuenta:</p>
                    <a href="${verificationLink}">Verificar Cuenta</a>
                `
            })

            const previewURL = nodemailer.getTestMessageUrl(info)
            console.log('📧 Ethereal URL:', previewURL); 

            return { previewURL, verificationLink }

        } catch (error) {
            console.error("Fallo mail, borrando usuario...", error)
            await UserRepository.deleteById(user_created._id)
            throw new ServerError(500, 'Error al enviar email. Inténtalo de nuevo.')
        }
    }

    static async verifyEmail (verification_token){
        try{
            const payload = jwt.verify(verification_token, ENVIRONMENT.JWT_SECRET)
            const {user_id} = payload
            
            if(!user_id){
                throw new ServerError(400, 'Token inválido')
            } 

            const user_found = await UserRepository.getById(user_id)
            if(!user_found){
                throw new ServerError(404, 'Usuario no encontrado')
            }

            if(user_found.verified_email){
                // Ya estaba verificado, seguimos
                return 
            }

            await UserRepository.updateById(user_id, {verified_email: true})
            return 
        }
        catch(error){
            if(error instanceof jwt.JsonWebTokenError){
                throw new ServerError(400, 'Token inválido o expirado')
            }
            throw error
        }
    }

    static async login (email, password){
        const user_found = await UserRepository.getByEmail(email)
        
        if(!user_found) throw new ServerError(404, 'Usuario no encontrado')
        if(!user_found.verified_email) throw new ServerError(401, 'Email no verificado')

        const is_same = await bcrypt.compare(password, user_found.password)
        if(!is_same) throw new ServerError(401, 'Contraseña incorrecta')

        const auth_token = jwt.sign(
            {
                name: user_found.name,
                email: user_found.email,
                id: user_found._id,
            },
            ENVIRONMENT.JWT_SECRET,
            { expiresIn: '24h' }
        )

        return { auth_token }
    }
}

export default AuthService