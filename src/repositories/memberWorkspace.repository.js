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
            const members = await MemberWorkspace.find({ id_user: user_id })
                .populate('id_workspace'); 

            const members_list_formatted = members.map(member => {
                if (!member.id_workspace) return null; 

                return {
                    workspace_id: member.id_workspace._id,
                    workspace_name: member.id_workspace.name,
                    workspace_url_image: member.id_workspace.url_image,
                    member_role: member.role
                };
            }).filter(item => item !== null);

            return members_list_formatted;
        }
        catch (error) {
            console.error('[SERVER ERROR]: Error al obtener workspaces del usuario', error);
            throw error;
        }
    }
}

export default MemberWorkspaceRepository;