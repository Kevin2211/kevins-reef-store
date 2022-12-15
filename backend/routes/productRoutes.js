import express from 'express'
import Product from '../models/product.js'
import expressAsyncHandler from 'express-async-handler'
import { isAdmin, isAuth } from '../utils.js'



const productRouter = express.Router()

productRouter.get('/', async (req,res) => {
    const products = await Product.find()
    res.send(products)
})

const page_size = 6
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

productRouter.get('/categories', expressAsyncHandler( async (req,res) => {
  const categories = await Product.find().distinct('category')
  res.send(categories)
  
}))

productRouter.post('/new',  isAuth, isAdmin, expressAsyncHandler( async (req,res) => {

  const product = new Product({
    name: req.body.name,
    slug: req.body.slug,
    image: req.body.image,
    category: req.body.category,
    description: req.body.description,
    careLevel: req.body.careLevel,
    countInStock: req.body.countInStock,
    price: req.body.price,
    lighting: req.body.lightLevel,
    flow: req.body.flowLevel,
    isAvailable: true,
  })
  const newProduct = await product.save()
  if(newProduct){
    res.send('New product created!')
  }else{
    res.status(404).send({message: 'Something went wrong'})
  }

}))
productRouter.put('/:id/edit', isAuth, isAdmin, expressAsyncHandler( async (req,res) => {

  const productId = req.params.id 
  const updatedProduct = await Product.findOneAndUpdate({ _id: productId}, {
    $set: {
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      category: req.body.category,
      description: req.body.description,
      careLevel: req.body.careLevel,
      countInStock: req.body.countInStock,
      price: req.body.price,
      lighting: req.body.lightLevel,
      flow: req.body.flowLevel,
      isAvailable: true,
    }
  })
  
  if(updatedProduct){
    res.send(updatedProduct)
  }else{
    res.status(401).send({message: "Product not found"})
  }

  
}))

productRouter.delete('/:id/delete', isAuth, isAdmin, expressAsyncHandler( async (req,res) => {

  const productId = req.params.id 
  const data = await Product.deleteOne({_id: productId})
  
  if(data.acknowledged){
    const newProductList = await Product.find()

      res.send(newProductList)
  }else{
    res.status(404).send(new Error('Something went wrong!'))
  }

  
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