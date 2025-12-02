import User from "../models/User.model.js"

class UserRepository {

    static async create(name, email, password) {
        try {
            const newUser = await User.create({
                name: name,
                email: email,
                password: password
            });
            return newUser;
        }
        catch (error) {
            console.error('Error al crear usuario:', error)
            throw error
        }
    }

    static async getAll() {
        try {
            // Buscamos usuarios activos
            const users = await User.find({ active: true })
            return users
        }
        catch (error) {
            console.error('Error al obtener usuarios:', error)
            throw error
        }
    }

    static async getByEmail(email) {
        try {
            return await User.findOne({ email: email });
        }
        catch (error) {
            console.error('Error buscando email:', error)
            throw error
        }
    }

    static async getById(id) {
        try {
            return await User.findById(id);
        }
        catch (error) {
            console.error('Error buscando por ID:', error)
            throw error
        }
    }

    static async updateById(id, updateData) {
        try {
            // new: true devuelve el usuario ya actualizado
            return await User.findByIdAndUpdate(id, updateData, { new: true });
        }
        catch (error) {
            console.error('Error actualizando usuario:', error)
            throw error
        }
    }
}

export default UserRepository