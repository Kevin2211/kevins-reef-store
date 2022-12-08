import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {

    const footerStyle = {
        backgroundColor: '#d7d8ea'
    }
    const divStyle = {
        backgroundColor: '#373e98'
    }
    const linkStyle ={

    }
    const paypalStyle ={
        width: '125px'
    }
  return (
    <div className=" footer mt-auto">

  <footer
          className="text-center text-lg-start text-dark mt-5"
          style={footerStyle}
          >

    <div className="container p-4 pb-0">

      <section className="">

        <div className="row">

          <div className=" col-lg-3 col-sm-12 mx-auto mt-3">
            
            <h6 className="text-uppercase mb-4 font-weight-bold">
            <img src="/images/kevinsreeflogo.png" className='logo' alt="" />
              Kevin's Reef Store
            </h6>
            <p>
              
            </p>
          </div>


          <hr className="w-100 clearfix d-md-none" />


          <div className=" col-lg-2 col-sm-6 mx-auto mt-3">
            <h6 className="text-uppercase mb-3 font-weight-bold">Help</h6>
            <p>
              <Link >DOA policy</Link>
            </p>
            <p>
              <Link className="text-dark">Shipping</ Link>
            </p>

          </div>


          <hr className="w-100 clearfix d-md-none" />


          <div className=" col-lg-2 col-sm-6 mx-auto mt-3">
            <h6 className="text-uppercase mb-3 font-weight-bold">Contact</h6>
            <p><i className="fas fa-home mr-3"></i> Houston, TX</p>
            <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>

          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className=" col-lg-2 col-sm-6 mx-auto mt-3">
            <h6 className="text-uppercase mb-3 font-weight-bold">Secure Payment</h6>
            <img src="/images/paypal.png" style={paypalStyle} alt="paypal" />

            

          </div>



          <div className=" col-lg-2 col-sm-6  mx-auto mt-3">
            <h6 className="text-uppercase mb-3 font-weight-bold">Follow us</h6>


            <a
               className="btn btn-floating m-1"
               style={linkStyle}

               href="https://www.instagram.com/yaboikevin42/"
               role="button"
               ><i className="fab fa-instagram fa-2x"></i
              ></a>



          </div>
        </div>

      </section>

    </div>


    <div
         className="text-center text-white p-3"
         style={divStyle}
         >
      Built and Designed by Kevin with <i className="fas fa-heart me-1"></i> © 2023 Copyright

    </div>

  </footer>

</div>

  )
}
