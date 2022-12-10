
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {Navbar, Container, Nav, Badge, NavDropdown, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Footer from './components/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';

function App() {
  const { state, dispatch: contextDispatch } = useContext(Store)
  const { cart, userInfo } = state

  const signoutHandler = () => {
    contextDispatch({ type: 'USER-SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/'
    
  }
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
     try {
      const { data } = await axios.get(`/api/products/categories`)
      setCategories(data)

     } catch (error) {
      toast.error(getError(error))
     } 
    }
    fetchCategories()
  },[])
  return (

    <BrowserRouter>
      <div className={ isSideBarOpen 
        ? 'd-flex flex-column ' 
        : "d-flex flex-column "
        }>
      <ToastContainer position='bottom-center' limit={1}/>
      <header>

        <Navbar bg="secondary" variant="dark" expand="lg" className='shadow'>
          <Container>
            <Button variant='secondary' className='me-2'
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
              <i className='fas fa-bars'></i>
            </Button>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src="/images/kevinsreeflogo.png" className='logo' alt="" />
                Kevin's Reef Store</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
            <Navbar.Collapse id='basic-navbar-nav'>
              <SearchBox></SearchBox>
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

      <div className={isSideBarOpen 
      ? 'active-cont side-navbar d-flex justify-content-between flex-wrap flex-column'
      : 'side-navbar d-flex  justify-content-between flex-wrap flex-column'}>
        <Nav className='flex-column text-white w-100 p-2'>
        <div className='d-flex justify-content-end '>
          <Button variant='secondary' className='me-2 mb-2'
              onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                <i className='fas fa-caret-left'></i>
          </Button>
        </div>
          <Nav.Item>
            <strong>Categories</strong>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category}> 
              <LinkContainer to={
                {
                  pathname: "/search",
                  search: `?category=${category}`
                }
              } 
              onClick={() => setIsSideBarOpen(false)}>
                <Nav.Link>{category}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))}
        </Nav>
      </div>
       <main>
        <Container className='mt-4'>
          <Routes>
            <Route path='/product/:slug' element={ <ProductScreen/> }/>
            <Route path='/order/:id' element={ <OrderScreen/> }/>
            <Route path='/search' element={ <SearchScreen/> }/>
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
