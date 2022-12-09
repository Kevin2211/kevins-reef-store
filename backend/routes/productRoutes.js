import express from 'express'
import Product from '../models/product.js'
import expressAsyncHandler from 'express-async-handler'

const productRouter = express.Router()

productRouter.get('/', async (req,res) => {
    const products = await Product.find()
    res.send(products)
})

const page_size = 3
productRouter.get('/search', expressAsyncHandler( async (req,res) => {

    const { query } = req;
    const pageSize = query.pageSize || page_size;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const careLevel = query.careLevel || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};

    const categoryFilter = category && category !== 'all' ? { category } : {};
    
    const careLevelFilter =
      careLevel && careLevel !== 'all'
        ? {
            careLevel: 
              Number(careLevel),
          }
        : {};

    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};

    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...careLevelFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...careLevelFilter,
    });


    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
    
}))

productRouter.get('/categories', expressAsyncHandler( async (req,res) => {
    const categories = await Product.find().distinct('category')
    res.send(categories)
    
}))

productRouter.get('/slug/:slug', async (req,res) => {

    const product = await Product.findOne( {slug: req.params.slug} )
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

productRouter.get('/:id', async (req,res) => {

    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

export default productRouter