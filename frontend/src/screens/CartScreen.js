import axios from 'axios'
import React, { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import MessageBox from '../components/MessageBox'
import { Store } from '../Store'

export default function CartScreen() {
    const { state, dispatch } = useContext(Store)
    const cartItems = state.cart.cartItems
    const navigate = useNavigate()


    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`)
        if( data.countInStock < quantity) {
            window.alert('Sorry. This product is out of stock')
            return
        }
    dispatch({
        type: 'CART_ADD_ITEM', 
        payload: {...item, quantity}
        
    })
    }
    const removeItemHandler = (item) => {
        dispatch({type: 'CART_REMOVE_ITEM', payload: item})
    }
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping')
    }
  return (
    <div>
        <Helmet>
            <title>Shopping Cart</title>
        </Helmet>
        <h1>Your Cart:</h1>
        <Row>
            <Col md={8} >
                { cartItems.length === 0 
                ? (<MessageBox> 
                    Your Cart is Empty. 
                    <Link to="/"> Go Shopping </Link>
                </MessageBox>)
                :  (
                    <ListGroup>
                        { cartItems.map(item => (
                            <ListGroup.Item key={item._id}>
                                <Row className='align-items-center'>
      
                                        <Col md={4} className='my-2'>
                                            <img src={ item.image } alt={ item.name } 
                                            className="img-fluid rounded img-thumbnail"/>
                                            {' '}
                                            <Link className='nav-link' to={`/product/${ item.slug}`}> { item.name }</Link>
                                        </Col>
                                        <Col md={3} className='my-2'>
                                        <Button variant="light" onClick={() => updateCartHandler(item, item.quantity -1)} disabled={item.quantity === 1}>
                                            <i className='fas fa-minus-circle'></i>
                                        </Button>
                                        <span>{ item.quantity }</span> {' '}
                                        <Button variant="light" onClick={ () => updateCartHandler(item, item.quantity + 1)} disabled={item.quantity === item.countInStock}>

                                            <i className='fas fa-plus-circle'></i>
                                        </Button>
                                        </Col>
                                        <Col md={3} className='my-2'>
                                            ${ item.price }
                                        </Col>
                                        <Col md={2} className='my-2'>
                                            <Button onClick={() => removeItemHandler(item)} variant='light'>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>

                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4} >
                <Card>
                    <Card.Body>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <p>
                                    Items: { cartItems.reduce( (a,b) => a + b.quantity, 0)}
                                </p>
                                <h3>
                                    Subtotal: ${ cartItems.reduce((a,b) => a + b.price * b.quantity , 0)}
                                </h3>
                                <small>
                                    (Tax and Shipping will be calculated at checkout)
                                </small>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <div className='d-grid'>
                                    <Button type='button' onClick={checkoutHandler} variant='primary' disabled={cartItems.length === 0}>
                                        Go to Checkout
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>

            </Col>
        </Row>
    </div>
  )
}
