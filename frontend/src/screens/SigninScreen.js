import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function SigninScreen() {
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'

  return (
    <Container className="small-container">
        <Helmet>
            <title>Sign In</title>
        </Helmet>
        <h1 className='my-3'>Sign In</h1>
        <Form>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>password</Form.Label>
                <Form.Control type='password' required></Form.Control>
            </Form.Group>
            <div className='mb-3'>
                <Button type='submit'>Sign In</Button>
            </div>
            <div className='mb-3'>
                New customer? {' '}
                <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
            </div>
        </Form>
    </Container>
  )
}
