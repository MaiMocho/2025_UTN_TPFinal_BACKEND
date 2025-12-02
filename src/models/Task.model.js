import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        },
        day_of_week: {
            type: String,
            required: true,
            default: 'Monday'
        },
        workspace_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    }
)

const Task = mongoose.model('Task', taskSchema)

export default Task