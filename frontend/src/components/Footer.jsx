import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {

    const footerStyle = {
        backgroundColor: '#0d6efd'
    }
    const divStyle = {
        backgroundColor: '#044dba'
    }
    const linkStyle ={

    }
    const paypalStyle ={
        width: '125px'
    }
  return (
    <div className="">

  <footer
          className="text-center text-lg-start text-white"
          style={footerStyle}
          >

    <div className="container p-4 pb-0">

      <section className="">

        <div className="row">

          <div className="col-md-3 col-lg-3  mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              Kevin's Reef Store
            </h6>
            <p>
              
            </p>
          </div>


          <hr className="w-100 clearfix d-md-none" />


          <div className="col-md-2 col-lg-2  mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Help</h6>
            <p>
              <Link className="text-white">DOA policy</Link>
            </p>
            <p>
              <Link className="text-white">Shipping</ Link>
            </p>

          </div>


          <hr className="w-100 clearfix d-md-none" />


          <div className="col-md-4 col-lg-2  mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p><i className="fas fa-home mr-3"></i> Houston, TX</p>
            <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>

          </div>
          <div className="col-md-4 col-lg-2  mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Secure Payment</h6>
            <img src="/images/paypal.png" style={paypalStyle} alt="paypal" />

            

          </div>



          <div className="col-md-3 col-lg-2  mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>


            <a
               className="btn btn-primary btn-floating m-1"
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
         className="text-center p-3"
         style={divStyle}
         >
      Built and Designed by Kevin with <i className="fas fa-heart me-3"></i> © 2023 Copyright

    </div>

  </footer>

</div>

  )
}
