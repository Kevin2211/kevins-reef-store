import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { Button, Card, ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Store } from '../Store'

const care = ['Easy', 'Moderate', 'Intermediate', 'Dedicated', 'Expert']


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
    <Card className='shadow border-0'>
        <Link to={`/product/${product.slug}`}>
            <img src={ product.image } className="card-img-top" alt={ product.name } />
        </Link>
        <Card.Body>
            <Link className='nav-link' to={`/product/${product.slug}`}>
                <Card.Title> { product.name }</Card.Title>
            </Link>
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text>Care Level:
            <ProgressBar animated variant='info' label={care[product.careLevel - 1]} now={product.careLevel/5 * 100}></ProgressBar>
            </Card.Text>
            <Card.Text>Lighting:
            <ProgressBar animated label={'Low'} now={25}></ProgressBar>
            </Card.Text>
            <Card.Text>Flow:
            <ProgressBar animated variant='success' label={`Strong`} now={75}></ProgressBar>
            </Card.Text>
            { product.countInStock === 0 ? <Button disabled >Out of Stock</Button> : <Button onClick={ addToCartHandler }>Add to cart</Button>}
        </Card.Body>
  </Card>
  )
}
