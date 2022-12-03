
import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {Navbar, Container, Nav, Badge, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';

function App() {
  const { state, dispatch: contextDispatch } = useContext(Store)
  const { cart, userInfo } = state

  const signoutHandler = () => {
    contextDispatch({ type: 'USER-SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    
  }
  return (

    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
      <ToastContainer position='bottom-center' limit={1}/>
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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="nav-dropdown">
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item> User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderhistory'>
                      <NavDropdown.Item> Orders</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider></NavDropdown.Divider>
                    <Link to='#signout' className='dropdown-item' onClick={signoutHandler}>Sign Out</Link>
                </NavDropdown>
              ):( <Link className="nav-link" to='/signin'> Sign In</Link> )}
            </Nav>
          </Container>
        </Navbar>


      </header>
       <main>
        <Container className='mt-4'>
          <Routes>
            <Route path='/product/:slug' element={ <ProductScreen/> }/>
            <Route path='/cart' element={ <CartScreen/> }/>
            <Route path='/signin' element={ <SigninScreen/> }/>
            <Route path='/signup' element={ <SignupScreen/> }/>
            <Route path='/shipping' element={ <ShippingAddressScreen />}></Route>
            <Route path="/" element={ <HomeScreen/> } />
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
