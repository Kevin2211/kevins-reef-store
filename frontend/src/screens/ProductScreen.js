import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async"
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";


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
    const navigate = useNavigate()
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
            dispatch({type: 'FETCH_FAIL', payload: getError(error)})
          }
        }
        fetchData()
      }, [])

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
        navigate('/cart')
      }
    
    return ( 
        loading ? <LoadingBox />
        :
        error ? <MessageBox variant="danger">{error}</MessageBox>
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
                                        <Button onClick={addToCartHandler} variant="primary">
                                            Add
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