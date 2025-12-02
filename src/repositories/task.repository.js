import Task from "../models/Task.model.js";

class TaskRepository {
    
    // Crear una tarea nueva
    static async create(title, day_of_week, workspace_id) {
        try {
            return await Task.create({
                title,
                day_of_week,
                workspace_id
            });
        } catch (error) {
            throw error;
        }
    }

    // Obtener todas las tareas de un workspace específico
    static async getAllByWorkspaceId(workspace_id) {
        try {
            return await Task.find({ workspace_id: workspace_id });
        } catch (error) {
            throw error;
        }
    }

    // Cambiar estado (pendiente <-> completado)
    static async updateStatus(task_id, status) {
        try {
            return await Task.findByIdAndUpdate(
                task_id, 
                { status: status }, 
                { new: true } // Para que devuelva el objeto actualizado
            );
        } catch (error) {
            throw error;
        }
    }

    // Eliminar tarea
    static async deleteById(task_id) {
        try {
            return await Task.findByIdAndDelete(task_id);
        } catch (error) {
            throw error;
        }
    }
}

export default TaskRepository;