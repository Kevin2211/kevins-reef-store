
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {Navbar, Container} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

function App() {
  return (

    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
      <header>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Kevin's Reef</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>


      </header>
       <main>
        <Container className='mt-4'>
          <Routes>
            <Route path="/" element={ <HomeScreen/> } />
            <Route path='/product/:slug' element={ <ProductScreen/> }/>
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
