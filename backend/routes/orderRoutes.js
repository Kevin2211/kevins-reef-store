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

orderRouter.get('/myorders', isAuth, expressAsyncHandler(async (req,res) => {
    const orders = await Order.find({user: req.user._id})

    res.send(orders)
}))

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req,res) => {
    const data = await Order.findById(req.params.id)
    if(data){
        res.send(data)
    } else{
        res.status(404).send({message: 'Order Not Found'})
    }
}))

orderRouter.put('/:id/pay',
isAuth,
expressAsyncHandler( async (req,res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save()
    
        res.send({message: 'Order paid', order: updatedOrder})
    }else{
        res.status(404).send({message: 'Order Not Found'})
    }
}))


export default orderRouter