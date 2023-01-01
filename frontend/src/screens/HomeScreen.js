
import { Row, Col} from 'react-bootstrap'
import { Helmet } from "react-helmet-async"
import ImageCarousel from "../components/ImageCarousel";
import { LinkContainer } from "react-router-bootstrap";
import Testimonial from "../components/Testimonial";



const HomeScreen = () => {

 

    return ( 
        <div>
          <Helmet>
            <title>Kevin's Reef</title>
          </Helmet>
          <div className='my-4'>
            <ImageCarousel></ImageCarousel>
          </div>
        <div className="container " >
          <h1 className="my-5 text-center">Shop by Category</h1>
          <Row >
            <Col className='mb-4 text-center' md={6} lg={4}>
              <LinkContainer to={
                    {
                      pathname: "/search",
                      search: `?category=LPS`
                    }
                  } 

                  >
                  <img src="https://res.cloudinary.com/dckddk4fm/image/upload/v1671123754/Kevins-reef-store/LPS_zn1fa9.jpg" className="category-image" alt="" />
              </LinkContainer>
              </Col> 

            <Col className='mb-4 text-center' md={6}  lg={4}>
              <LinkContainer to={
                    {
                      pathname: "/search",
                      search: `?category=SPS`
                    }
                  } 
                  >
                <img src="https://res.cloudinary.com/dckddk4fm/image/upload/v1671123807/Kevins-reef-store/SPS_kowrjr.png" className="category-image" alt="" />
              </LinkContainer>
              </Col>

            <Col className='mb-4 text-center' md={6}  lg={4}>
              <LinkContainer to={
                    {
                      pathname: "/search",
                      search: `?category=Anemone`
                    }
                  } 
                  >
                <img src="https://res.cloudinary.com/dckddk4fm/image/upload/v1671123932/Kevins-reef-store/Anemone_k4jrcf.png" className="category-image" alt="" />
              </LinkContainer>
              </Col>

            <Col className='mb-4 text-center' md={6}  lg={4}>
              <LinkContainer to={
                    {
                      pathname: "/search",
                      search: `?category=Softie`
                    }
                  } 
                  >
                <img src="https://res.cloudinary.com/dckddk4fm/image/upload/v1671125648/Kevins-reef-store/NEgd71671121391_m5is69.jpg" className="category-image" alt="" />
              </LinkContainer>
              </Col>

            <Col className='mb-4 text-center' md={6}  lg={4}>
              <LinkContainer to={
                    {
                      pathname: "/search",
                      search: `?category=Zoanthid`
                    }
                  } 
                  >
                <img src="https://res.cloudinary.com/dckddk4fm/image/upload/v1671123827/Kevins-reef-store/zoanthid_h04xrw.png" className="category-image" alt="" />
              </LinkContainer>
              </Col>

            <Col className='mb-4 text-center' md={6}  lg={4}>
              <LinkContainer to={
                    {
                      pathname: "/search",
                      search: `?category=Torches`
                    }
                  } 
                  >
                <img src="https://res.cloudinary.com/dckddk4fm/image/upload/v1671123818/Kevins-reef-store/Torches_svufg3.jpg" className="category-image" alt="" />
              </LinkContainer>
              </Col>
          </Row>
        </div>
          <div className='mt-5'>
            <h1 className="mb-3 text-center">Reviews From Real Reefers</h1>
            <Testimonial />
          </div>
        </div>
     );
}
 
export default HomeScreen;