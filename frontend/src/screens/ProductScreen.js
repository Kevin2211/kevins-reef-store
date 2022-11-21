import axios from "axios";
import { useEffect, useReducer } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async"


const reducer = (state,action) => {
    switch(action.type){
      case 'FETCH_REQUEST':
        return {...state, loading: true};
      case 'FETCH_SUCCESS':
        return{...state, product: action.payload, loading: false};
      case 'FETCH_FAIL':
        return {...state, loading: false, error: action.payload};
      default:
        return state;
    }
  }

const ProductScreen = () => {
    const params = useParams()
    const { slug } = params
    const [{loading, error, product}, dispatch] = useReducer(reducer, {
        product: [],
        loading: true, 
        error: ''
      })
    
      useEffect(() => {
        const fetchData = async () => {
          dispatch({type: 'FETCH_REQUEST'})
          try {
            const result = await axios.get(`/api/products/slug/${slug}`)
            dispatch({type: 'FETCH_SUCCESS', payload: result.data})

          } catch (error) {
            dispatch({type: 'FETCH_FAIL', payload: error.message})
          }
        }
        fetchData()
      }, [])
    
    return ( 
        loading ? <div>Loading...</div>
        :
        error ? <div>{error.message}</div>
        :
        <div>
            <Row>
                <Col lg= { 6 } sm= { 12 }>
                    <img src={product.image} alt={product.name} className="product-image"/>
                </Col>
                <Col lg= { 3 }>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                                <title>{product.name}</title>
                            </Helmet>
                            <h1>{product.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{product.careLevel}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{product.category}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col lg= { 3 }>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ? 
                                        (<Badge bg="success">In Stock</Badge>) : 
                                        (<Badge bg="danger">Out of Stock</Badge>)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button variant="primary">
                                            Add to Cart
                                        </Button> 
                                    </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
     );
}
 
export default ProductScreen;