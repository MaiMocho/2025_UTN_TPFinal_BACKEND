import ENVIRONMENT from "./config/environment.config.js";
import connectToMongoDB from "./config/configMongoDB.config.js";
import express from 'express'
import cors from 'cors'
// Rutas
import authRouter from "./routes/auth.router.js";
import workspaceRouter from "./routes/workspace.router.js";
import memberRouter from "./routes/member.router.js";
// import MessagesChannelRepository from "./repositories/messageChannel.repository.js";
// import ChannelRepository from "./repositories/channel.repository.js";
// import UserRepository from "./repositories/user.repository.js";

const app = express()
connectToMongoDB();

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/workspace', workspaceRouter)
app.use('/api/member', memberRouter)

app.listen(
    ENVIRONMENT.PORT || 8080,
    () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${ENVIRONMENT.PORT || 8080}`)
    }
)