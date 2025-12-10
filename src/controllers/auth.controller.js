import ENVIRONMENT from "../config/environment.config.js";
import { ServerError } from "../error.js";
import AuthService from "../services/auth.service.js";

class AuthController {
    async register(req, res) {
    try {
        const { username, email, password } = req.body;
        
        const existingUser = await UserRepository.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }

        const newUser = await AuthService.register({ username, email, password }); 

        try {
            await sendEmail({
                to: email,
                subject: 'Valida tu cuenta',
                html: `<h1>Bienvenido ${username}!</h1><a href="${ENVIRONMENT.URL_FRONTEND}/verify/${newUser.verificationToken}">Verificar cuenta</a>`
            });
        } catch (mailError) {
            console.error("Error al enviar el email:", mailError.message);
        }

        return res.status(201).json({ 
            message: 'Usuario registrado con éxito',
            user: newUser
        });

    } catch (error) {
        console.error("Error fatal:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
}

    static async verifyEmail (request, response){
        try{
            const {verification_token} = request.params

            await AuthService.verifyEmail(verification_token)
            response.redirect(
                ENVIRONMENT.URL_FRONTEND + '/login?from=verified_email'
            )
        }
        catch(error){


            if(error.status){
                response.send(
                    `<h1>${error.message}</h1>`
                )
            }
            else{
                console.error(
                    'ERROR AL REGISTRAR', error
                )

                response.send(
                    `<h1>Error en el servidor, intentelo mas tarde</h1>`
                )
            }
        }
    }

    static async login (request, response){
        try{
            const {email, password} = request.body

            const { auth_token } = await AuthService.login(email, password)

            response.status(200).json(
                {
                    ok: true, 
                    message: 'Usuario logueado con exito',
                    status: 200,
                    body: {
                        auth_token
                    }
                }
            )
            return 
        }
        catch(error){
            if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL REGISTRAR', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }
}


export default AuthController
