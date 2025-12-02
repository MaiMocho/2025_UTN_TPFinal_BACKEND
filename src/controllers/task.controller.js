import TaskRepository from "../repositories/task.repository.js";

class TaskController {
    
    static async create(request, response) {
        try {
            const { workspace_id } = request.params;
            const { title, day_of_week } = request.body;

            const task = await TaskRepository.create(title, day_of_week, workspace_id);

            response.status(201).json({
                ok: true,
                message: 'Tarea creada',
                data: { task }
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ ok: false, message: 'Error interno' });
        }
    }

    static async getAll(request, response) {
        try {
            const { workspace_id } = request.params;
            const tasks = await TaskRepository.getAllByWorkspaceId(workspace_id);

            response.status(200).json({
                ok: true,
                message: 'Tareas obtenidas',
                data: { tasks }
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ ok: false, message: 'Error interno' });
        }
    }

    static async changeStatus(request, response) {
        try {
            const { task_id } = request.params;
            const { status } = request.body; // Esperamos 'completed' o 'pending'

            const task = await TaskRepository.updateStatus(task_id, status);

            response.status(200).json({
                ok: true,
                message: 'Estado actualizado',
                data: { task }
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ ok: false, message: 'Error interno' });
        }
    }
    
    static async delete(request, response) {
        try {
            const { task_id } = request.params;
            await TaskRepository.deleteById(task_id);
            response.status(200).json({ ok: true, message: 'Tarea eliminada' });
        } catch (error) {
            console.error(error);
            response.status(500).json({ ok: false, message: 'Error interno' });
        }
    }
}

export default TaskController;