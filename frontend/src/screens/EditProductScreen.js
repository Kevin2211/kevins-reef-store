import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Store } from '../Store'
import { getError } from '../utils'

export default function EditProductScreen() {
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params
    const { state } = useContext(Store)
    const { userInfo } = state


    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [careLevel, setCareLevel] = useState()
    const [countInStock, setCountInStock] = useState()
    const [price, setPrice] = useState()


    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/products/${id}/edit`, {
                name,
                slug,
                image,
                category,
                description,
                careLevel,
                countInStock,
                price,
            }, {
                    headers: {
                        authorization : `Bearer ${ userInfo.token}`
                    }
            })


            navigate('/admin/productlist')
        } catch (error) {
            toast.error(getError(error.message))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`)

                setName(data.name)
                setSlug(data.slug)
                setImage(data.image)
                setCategory(data.category)
                setDescription(data.description)
                setCareLevel(data.careLevel)
                setCountInStock(data.countInStock)
                setPrice(data.price)

            } catch (error) {
                toast.error(getError(error))
            }
        }

        fetchData()
    },[id])


  return (
    <Container className="small-container">
        <Helmet>
            <title>Edit Product</title>
        </Helmet>
        <h1 className='my-3'>Edit Product</h1>
        <Form  onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control type='text' onChange={(e) => setName(e.target.value)} value={name} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='slug'>
                <Form.Label>Slug:</Form.Label>
                <Form.Control type='text' onChange={(e) => setSlug(e.target.value)} value={slug} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Image:</Form.Label>
                <Form.Control type='text'  onChange={(e) => setImage(e.target.value)} value={image} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='category'>
                <Form.Label>Category:</Form.Label>
                <Form.Control type='text'  onChange={(e) => setCategory(e.target.value)} value={category} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='description'>
                <Form.Label>Description:</Form.Label>
                <Form.Control style={{ height: '100px' }} as="textarea"  onChange={(e) => setDescription(e.target.value)} value={description} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='careLevel'>
                <Form.Label>Care level:</Form.Label>
                <Form.Control type='number'  onChange={(e) => setCareLevel(e.target.value)} value={careLevel} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='countInStock'>
                <Form.Label>Quantity:</Form.Label>
                <Form.Control type='number'  onChange={(e) => setCountInStock(e.target.value)} value={countInStock} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='price'>
                <Form.Label>Price:</Form.Label>
                <Form.Control type='number'  onChange={(e) => setPrice(e.target.value)} value={price} required></Form.Control>
            </Form.Group>
            <div className='mb-3'>
                <Button type='submit' variant='secondary'>Submit</Button>
            </div>
        </Form>
            <div className='mb-3'>
                <Button type='submit' onClick={() => navigate('/admin/productlist')}>Cancel</Button>
            </div>
    </Container>
  )
}
