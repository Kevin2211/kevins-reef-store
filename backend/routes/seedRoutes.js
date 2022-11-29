import express from 'express'
import data from '../data.js'
import Product from '../models/product.js'
const seedRouter = express.Router()

seedRouter.get('/', async (req,res) => {
    await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({createdProducts})
})

export default seedRouter