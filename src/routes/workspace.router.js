import express from 'express'
import WorkspaceController from '../controllers/workspace.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import workspaceMiddleware from '../middlewares/workspaceMiddleware.js'
import TaskController from '../controllers/task.controller.js'

const workspaceRouter = express.Router()

workspaceRouter.get('/', authMiddleware, WorkspaceController.getAll)
workspaceRouter.post('/', authMiddleware, WorkspaceController.create)
workspaceRouter.get('/:workspace_id', authMiddleware, workspaceMiddleware(), WorkspaceController.getById)
workspaceRouter.post('/:workspace_id/invite', authMiddleware, workspaceMiddleware(['admin']), WorkspaceController.invite)


/* --- RUTAS PARA LAS TAREAS --- */

// Crear tarea
workspaceRouter.post(
    '/:workspace_id/tasks',
    authMiddleware,
    workspaceMiddleware(),
    TaskController.create
)

// Obtener todas las tareas del workspace
workspaceRouter.get(
    '/:workspace_id/tasks',
    authMiddleware,
    workspaceMiddleware(),
    TaskController.getAll
)

// Cambiar estado de tarea
workspaceRouter.put(
    '/:workspace_id/tasks/:task_id/status',
    authMiddleware,
    workspaceMiddleware(),
    TaskController.changeStatus
)

// Borrar tarea
workspaceRouter.delete(
    '/:workspace_id/tasks/:task_id',
    authMiddleware,
    workspaceMiddleware(),
    TaskController.delete
)

export default workspaceRouter