import express from 'express'
import data from '../data.js'
import Order from '../models/order.js'
import Product from '../models/product.js'
import User from '../models/user.js'
const seedRouter = express.Router()

seedRouter.get('/', async (req,res) => {
    await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({createdProducts})

})

export default seedRouter