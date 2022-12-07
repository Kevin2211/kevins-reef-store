import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button, Form } from 'react-bootstrap'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'
import CheckoutBar from '../components/CheckoutBar'


export default function ShippingAddressScreen() {

  const navigate = useNavigate()
  const { state ,dispatch: contextDispatch} = useContext(Store)
  const savedShippingAddress = state.cart.shippingAddress
  const {userInfo} = state
  const [fullName, setFullName] = useState( savedShippingAddress.fullName || '')
  const [address1, setAddress1] = useState(savedShippingAddress.address1 || '')
  const [address2, setAddress2] = useState(savedShippingAddress.address2 || '')
  const [city, setCity] = useState(savedShippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(savedShippingAddress.postalCode || '')

  useEffect(() => {
    if(!userInfo){
      navigate('/signin?redirect=shipping')
    }
  }, [userInfo, navigate])



  const submitHandler = (e) => {
    e.preventDefault()
    contextDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address1,
        address2,
        city,
        postalCode,
        
      }
    })

    localStorage.setItem('shippingAddress',
    JSON.stringify({
      fullName,
      address1,
      address2,
      city,
      postalCode,
    })
    )
    navigate('/payment')
  }

  return (
    <div className='container'>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
        <CheckoutBar step1 step2></CheckoutBar>
        <div className='container small-container'>
        <h1 className='my-3'>Shipping Address</h1>
          <Form >
            <Form.Group className='mb-3' controlId='fullName'>
              <Form.Label>Full Name: </Form.Label>
              <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='address1'>
              <Form.Label>Address: </Form.Label>
              <Form.Control value={address1} onChange={(e) => setAddress1(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='address2'>
              <Form.Label>Address line 2: </Form.Label>
              <Form.Control value={address2} onChange={(e) => setAddress2(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='city'>
              <Form.Label>City: </Form.Label>
              <Form.Control value={city} onChange={(e) => setCity(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='postalCode'>
              <Form.Label>Zip Code: </Form.Label>
              <Form.Control value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></Form.Control>
            </Form.Group>
            <div className='mb-3'>
              <Button variant='primary' onClick={ submitHandler }>
                Continue
              </Button>
            </div>
          </Form>
        </div>
       
    </div>
  )
}