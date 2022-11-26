import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function Product(props) {
    const { product } = props
  return (
    <Card>
        <Link to={`/product/${product.slug}`}>
            <img src={ product.image } className="card-img-top" alt={ product.name } />
        </Link>
        <Card.Body>
            <Link to={`/product/${product.slug}`}>
                <Card.Title> { product.name }</Card.Title>
            </Link>
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text>Care Level: {product.careLevel}</Card.Text>
            <Button>Add to cart</Button>
        </Card.Body>
  </Card>
  )
}
