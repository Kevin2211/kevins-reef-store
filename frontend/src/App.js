
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {Navbar, Container, Nav, Badge} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';

function App() {
  const { state } = useContext(Store)
  const { cart } = state
  return (

    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
      <header>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Kevin's Reef</Navbar.Brand>
            </LinkContainer>
            <Nav className='me-auto'>
              <Link to='/cart' className='nav-link'>
                Cart 
                { cart.cartItems.length > 0 && (
                  <Badge pill className='mx-1' bg="danger">
                    {cart.cartItems.reduce( (a,b) => a + b.quantity, 0)}
                  </Badge>
                )
                }
              </Link>
            </Nav>
          </Container>
        </Navbar>


      </header>
       <main>
        <Container className='mt-4'>
          <Routes>
            <Route path="/" element={ <HomeScreen/> } />
            <Route path='/product/:slug' element={ <ProductScreen/> }/>
            <Route path='/cart' element={ <CartScreen/> }/>
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>

  );
}

export default App;
