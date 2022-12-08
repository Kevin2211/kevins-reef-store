import React, { useContext, useEffect, useReducer } from 'react'
import CheckoutBar from '../components/CheckoutBar'
import {Helmet} from 'react-helmet-async'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Store } from '../Store'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getError } from '../utils'
import axios from 'axios'
import LoadingBox from '../components/LoadingBox'


const reducer = (state,action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return {...state, loading: true}
        case 'CREATE_SUCCESS':
            return {...state, loading: false}
        case 'CREATE_FAIL':
            return {...state, loading: false}
        default:
            return state;
    }
}


export default function PlaceOrderScreen () {

    const { state: {cart, userInfo}, dispatch: contextDispatch } = useContext(Store)
    const navigate = useNavigate()
    const roundNumber = (num) => {
        return Math.round(num * 100 + Number.EPSILON) / 100
    }

    cart.itemsPrice = roundNumber(
        cart.cartItems.reduce((a,b) => a + b.quantity * b.price , 0)
    )

    cart.shippingPrice = cart.itemsPrice > 250 ? roundNumber(0) : roundNumber(45)

    cart.taxPrice = roundNumber(0.15 * cart.itemsPrice)
    
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice + cart.taxPrice


    const [{ loading }, dispatch ] = useReducer(reducer, {
        loading: false,

    })

    const placeOrderHandler = async () => {
            try {
                dispatch({type: 'CREATE_REQUEST'})
                const { data } = await axios.post('/api/orders', {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                contextDispatch({type: 'CART_CLEAR'})
                dispatch({type: 'CREATE_SUCCESS'})
                localStorage.removeItem('cartItems')
                navigate(`/order/${data.order._id}`)

            } catch (error) {
                dispatch({type: 'CREATE_FAIL'})
                toast.error(getError(error))
            }
    }
    useEffect(() => {
        if(!cart.paymentMethod){
            navigate('/payment')
        }
    }, [cart, navigate])
    

  return (
    <div className='container'>
        <CheckoutBar step1 step2 step3 step4></CheckoutBar>
        <Helmet>
            <title>Preview Order</title>
        </Helmet>
        <h1 className='my-3'>Preview Order</h1>
        <Row>
            <Col md={8} >
                <Card className='mb-3'>
                    <Card.Body>
                        <Card.Title>Shipping</Card.Title>
                        <Card.Text>
                            <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                            <strong>Address: </strong> {cart.shippingAddress.address1}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode} 
                        </Card.Text>
                        <Link className='nav-link' to='/shipping'>Edit</Link>

                    </Card.Body>
                </Card>
                <Card className='mb-3'>
                    <Card.Body>
                        <Card.Title>Payment</Card.Title>
                        <Card.Text>
                            <strong>Payment Method:</strong> {cart.paymentMethod} <br/>
                        </Card.Text>
                        <Link className='nav-link' to='/payment'>Edit</Link>

                    </Card.Body>
                </Card>
                <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link className='nav-link' to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        Quantity: <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>Price: ${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link className='nav-link' to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
            <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Subtotal: </Col>
                            <Col>${cart.itemsPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping: </Col>
                            <Col>${cart.shippingPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax: </Col>
                            <Col>${cart.taxPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col> <strong>Total: </strong> </Col>
                            <Col>${cart.totalPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='d-grid'>
                            <Button type='button' 
                            onClick={placeOrderHandler}
                            disabled={cart.cartItems.length === 0}>
                                Place Order
                            </Button>
                        </div>
                        <div className='d-grid'>
                        {loading && <LoadingBox /> }

                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Col>
        </Row>
    </div>
  )
}
