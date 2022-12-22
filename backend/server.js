import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'
import http from 'http'
import { Server } from 'socket.io';


const app = express()
const port = process.env.PORT || 2000
const __dirname = path.resolve()

dotenv.config()


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB successfully!')
}).catch(error => {
    console.log(error.message)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})


app.use('/api/upload', uploadRouter)
app.use('/api/seed', seedRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)


app.use(express.static(path.join(__dirname,'/frontend/build')))
app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')))

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message})
})

//live chat implementation
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

io.on('connection', (socket => {
    socket.on('disconnect', () => {
        const user = users.find((x) => x.socketId === socket.id)
        if (user) {
            user.online = false
            console.log('offline', user.name)
            const admin = users.find((x) => x.isAdmin && x.online)
            if(admin){
                io.to(admin.socketId).emit('updatedUser', user)
            }
        }
    })
    socket.on('onLogin', (user) => {
        const updatedUser = {   
            ...user,
            online: true,
            socketId: socket.id,
            messages: [],

        }
        const existUser = users.find((x) => x._id === updatedUser._id)
        if(existUser){
            existUser.socketId = socket.id
            existUser.online = true
        }else{
            users.push(updatedUser)
        }
        console.log('Online', user.name)
        const admin = users.find((x) => x.isAdmin && x.online)
        if(admin){
            io.to(admin.socketId).emit('updatedUser', user)
        }
        if(updatedUser.isAdmin){
            io.to(updatedUser.socketId).emit('listUsers', users)
        }
    })

    socket.on('onUserSelected', (user) => {
        const admin= users.find((x) => x.isAdmin && x.online)
        if(admin){
            const existUser = users.find((x) => x._id === user._id)
            io.to(admin.socketId).emit('selectedUser', existUser)
        }
    })
    socket.on('onMessage', (message) => {
        if(message.isAdmin){
            const user = users.find((x) => x._id === message._id && x.online)
            if(user){
                io.to(user.socketId).emit('message', message)
                user.messages.push(message)
            }
        }else{
            const admin= users.find((x) => x.isAdmin && x.online)
            if(admin){
                io.to(admin.socketId).emit('message', message)
                const user = users.find((x) => x._id === message._id && x.online);
                user.messages.push(message);
            }else{
                io.to(socket.id).emit('message', {
                    name: 'Admin',
                    body: 'Sorry. Im currently away'
                })
            }
        }
    })
}))

httpServer.listen(port, () => {
        console.log(`Server Listening at http://localhost:${port}`)
    }
        )

// app.listen(port, () => {
//     console.log(`Server Listening at http://localhost:${port}`)
// })