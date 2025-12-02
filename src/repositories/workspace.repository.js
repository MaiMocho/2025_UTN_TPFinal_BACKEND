import Workspace from "../models/Workspace.model.js";
import { ServerError } from "../error.js"; 

class WorkspaceRepository {
    
    static async create(name, url_image) {
        try {
            const workspace = await Workspace.create({
                name: name,
                url_image: url_image
            });
            return workspace;
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo crear el workspace', error);
            throw error;
        }
    }

    static async getById(workspace_id) {
        try {
            const workspace = await Workspace.findOne({ _id: workspace_id, active: true });
            return workspace;
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo encontrar el workspace', error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const workspaces = await Workspace.find({ active: true });
            return workspaces;
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo obtener la lista', error);
            throw error;
        }
    }

    static async deleteById(workspace_id) {
        try {
            const workspace = await Workspace.findByIdAndUpdate(
                workspace_id, 
                { active: false }, 
                { new: true }
            );
            return workspace;
        }
        catch (error) {
            console.error('[SERVER ERROR]: Error al eliminar workspace', error);
            throw error;
        }
    }

    static async updateById(workspace_id, update_data) {
        try {
            const workspace = await Workspace.findByIdAndUpdate(
                workspace_id, 
                update_data, 
                { new: true } // Para devolver el dato actualizado
            );
            return workspace;
        }
        catch (error) {
            console.error('[SERVER ERROR]: Error al actualizar workspace', error);
            throw error;
        }
    }
}

export default WorkspaceRepository;