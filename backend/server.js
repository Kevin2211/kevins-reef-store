import express from 'express'
import data from './data.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRoutes.js'
import Product from './models/product.js'

const app = express()
const port = process.env.PORT || 2000

dotenv.config()

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB successfully!')
}).catch(error => {
    console.log(error.message)
})

app.use('/api/seed', seedRouter)

app.use('/api/products', productRouter)

app.get('/api/products/slug/:slug', async (req,res) => {

    const product = await Product.findOne( {slug: req.params.slug} )
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

app.get('/api/products/:id', async (req,res) => {

    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

app.listen(port, () => {
    console.log(`Backend Server Listening at http://localhost:${port}`)
})