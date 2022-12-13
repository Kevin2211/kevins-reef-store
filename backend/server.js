import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'

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
app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/frontend/build/index')))

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message})
})


app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`)
})