import MemberWorkspace from "../models/MemberWorkspace.model.js";

class MemberWorkspaceRepository {

    static async create(user_id, workspace_id, role) {
        try {
            const member = await MemberWorkspace.create({
                id_user: user_id,
                id_workspace: workspace_id,
                role: role
            });
            return member;
        }
        catch (error) {
            console.error('[SERVER ERROR]: Error al crear miembro', error);
            throw error;
        }
    }

    static async getByUserIdAndWorkspaceId(user_id, workspace_id) {
        try {
            // Buscamos un documento que coincida con ambos IDs
            const member = await MemberWorkspace.findOne({ 
                id_user: user_id, 
                id_workspace: workspace_id 
            });
            return member;
        } 
        catch (error) {
            console.error('[SERVER ERROR]: Error al buscar miembro', error);
            throw error;
        }
    }

    static async getAllByUserId(user_id) {
        try {
            // .populate() funciona perfecto aquí porque todo es Mongo
            const members = await MemberWorkspace.find({ id_user: user_id })
                .populate('id_workspace'); 

            // Formateamos la salida para que el front reciba algo limpio
            /* OJO: Al hacer populate, id_workspace deja de ser un ID y pasa a ser 
            el OBJETO completo del workspace.
            */
            const members_list_formatted = members.map(member => {
                // Validación por si un workspace fue borrado físicamente pero el miembro no
                if (!member.id_workspace) return null; 

                return {
                    workspace_id: member.id_workspace._id,
                    workspace_name: member.id_workspace.name,
                    workspace_url_image: member.id_workspace.url_image,
                    member_role: member.role
                };
            }).filter(item => item !== null); // Quitamos nulos

            return members_list_formatted;
        }
        catch (error) {
            console.error('[SERVER ERROR]: Error al obtener workspaces del usuario', error);
            throw error;
        }
    }
}

export default MemberWorkspaceRepository;