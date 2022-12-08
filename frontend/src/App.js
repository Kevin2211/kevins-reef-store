
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
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
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Footer from './components/Footer';

function App() {
  const { state, dispatch: contextDispatch } = useContext(Store)
  const { cart, userInfo } = state

  const signoutHandler = () => {
    contextDispatch({ type: 'USER-SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
    
  }
  return (

    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
      <ToastContainer position='bottom-center' limit={1}/>
      <header>
        <Navbar bg="secondary" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src="/images/kevinsreeflogo.png" className='logo' alt="" />
                Kevin's Reef Store</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto w-100 justify-content-end'>
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
                    <LinkContainer to='/myprofile'>
                      <NavDropdown.Item> User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/myorders'>
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider></NavDropdown.Divider>
                    <Link to='#signout' className='dropdown-item' onClick={signoutHandler}>Sign Out</Link>
                </NavDropdown>
              ):( <Link className="nav-link" to='/signin'> Sign In</Link> )}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


      </header>
       <main>
        <Container className='mt-4'>
          <Routes>
            <Route path='/product/:slug' element={ <ProductScreen/> }/>
            <Route path='/order/:id' element={ <OrderScreen/> }/>
            <Route path='/cart' element={ <CartScreen/> }/>
            <Route path='/signin' element={ <SigninScreen/> }/>
            <Route path='/signup' element={ <SignupScreen/> }/>
            <Route path='/myprofile' element={ <ProfileScreen/> }/>
            <Route path='/shipping' element={ <ShippingAddressScreen />}></Route>
            <Route path='/payment' element={ <PaymentScreen/> }/>
            <Route path='/placeorder' element={ <PlaceOrderScreen/> }/>
            <Route path='/myorders' element={ <OrderHistoryScreen/> }/>
            <Route path="/" element={ <HomeScreen/> } />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
    </BrowserRouter>

  );
}

export default App;
