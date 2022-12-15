import { useEffect, useReducer } from "react";
//import data from "../data";
import axios from 'axios'

import { Row, Col} from 'react-bootstrap'
import Product from "../components/Product";
import { Helmet } from "react-helmet-async"
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { LinkContainer } from "react-router-bootstrap";

const reducer = (state,action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return{...state, products: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}

const HomeScreen = () => {

  const [{loading, error, products}, dispatch] = useReducer(reducer, {
    products: [],
    loading: true, 
    error: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'})
      try {
        const result = await axios.get('/api/products')
        dispatch({type: 'FETCH_SUCCESS', payload: result.data})

      } catch (error) {
        dispatch({type: 'FETCH_FAIL', payload: error.message})
      }
    }
    fetchData()
  }, [])

    return ( 
        <div>
          <Helmet>
            <title>Kevin's Reef</title>
          </Helmet>
        <h1>Category </h1>
        <div className="products d-flex" >
          <Row >
            <LinkContainer to={
                  {
                    pathname: "/search",
                    search: `?category=LPS`
                  }
                } 
                >
              <Col className='my-5' md={6} lg={4}>
                <img src="/images/LPS.jpg" className="category-image" alt="" />
              </Col> 
            </LinkContainer>
            <LinkContainer to={
                  {
                    pathname: "/search",
                    search: `?category=SPS`
                  }
                } 
                >
              <Col className='my-5' md={6}  lg={4}>
              <img src="/images/SPS.png" className="category-image" alt="" />
              </Col>
            </LinkContainer>
            <LinkContainer to={
                  {
                    pathname: "/search",
                    search: `?category=Anemone`
                  }
                } 
                >
              <Col className='my-5' md={6}  lg={4}>
              <img src="/images/SPS.png" className="category-image" alt="" />
              </Col>
            </LinkContainer>
            <LinkContainer to={
                  {
                    pathname: "/search",
                    search: `?category=Softie`
                  }
                } 
                >
              <Col className='my-5' md={6}  lg={4}>
              <img src="/images/Softie.jpg" className="category-image" alt="" />
              </Col>
            </LinkContainer>

            <LinkContainer to={
                  {
                    pathname: "/search",
                    search: `?category=Zoanthid`
                  }
                } 
                >
              <Col className='my-5' md={6}  lg={4}>
              <img src="/images/Softie.jpg" className="category-image" alt="" />
              </Col>
            </LinkContainer>
            <LinkContainer to={
                  {
                    pathname: "/search",
                    search: `?category=Goniopora`
                  }
                } 
                >
              <Col className='my-5' md={6}  lg={4}>
              <img src="/images/Softie.jpg" className="category-image" alt="" />
              </Col>
            </LinkContainer>
          </Row>
        </div>
        </div>
     );
}
 
export default HomeScreen;