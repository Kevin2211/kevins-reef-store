import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Store } from '../Store'


export default function Product(props) {
    const { product } = props
    const { state, dispatch: contextDispatch } = useContext(Store)

    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find(item => product._id === item._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        const { data } = await axios.get(`/api/products/${product._id}`) 
            if( data.countInStock < quantity) {
                window.alert('Sorry. This product is out of stock')
                return
            }
        contextDispatch({
            type: 'CART_ADD_ITEM', 
            payload: {...product, quantity}
        })
        console.log(state)
      }

  return (
    <Card>
        <Link to={`/product/${product.slug}`}>
            <img src={ product.image } className="card-img-top" alt={ product.name } />
        </Link>
        <Card.Body>
            <Link className='nav-link' to={`/product/${product.slug}`}>
                <Card.Title> { product.name }</Card.Title>
            </Link>
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text>Care Level: {product.careLevel}</Card.Text>
            { product.countInStock === 0 ? <Button disabled >Out of Stock</Button> : <Button onClick={ addToCartHandler }>Add to cart</Button>}
        </Card.Body>
  </Card>
  )
}
