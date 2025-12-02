import TaskRepository from "../repositories/task.repository.js";
import { ServerError } from "../error.js"; // Asegúrate de tener esta clase de error disponible

class TaskService {
    
    static async getAll(workspace_id) {
        try {
            return await TaskRepository.getAllByWorkspaceId(workspace_id);
        } catch (error) {
            throw error;
        }
    }

    static async create(workspace_id, title, day_of_week) {
        try {
            if (!title) throw new ServerError(400, "El título es obligatorio");
            
            return await TaskRepository.create(title, day_of_week, workspace_id);
        } catch (error) {
            throw error;
        }
    }

    static async changeStatus(task_id, status) {
        try {
            if (!['pending', 'completed'].includes(status)) {
                throw new ServerError(400, "Estado inválido");
            }
            return await TaskRepository.updateStatus(task_id, status);
        } catch (error) {
            throw error;
        }
    }

    static async delete(task_id) {
        try {
            return await TaskRepository.deleteById(task_id);
        } catch (error) {
            throw error;
        }
    }
}

export default TaskService;