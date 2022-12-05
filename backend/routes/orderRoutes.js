import express from 'express'
import Order from '../models/order.js'
import expressAsyncHandler from 'express-async-handler'
import { isAuth } from '../utils.js'

const orderRouter = express.Router()

orderRouter.post('/', isAuth,expressAsyncHandler(async (req,res)=> {
    const { shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body

    const order = new Order({
       orderItems: req.body.orderItems.map(item => ({ ...item, product: item._id}) ),
       shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: req.user._id
       
    })

    const newOrder = await order.save()
    res.status(201).send({message: 'New Order Created!', order})
}))

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        res.send(order)
    } else{
        res.status(404).send({message: 'Order Not Found'})
    }
}))

export default orderRouter