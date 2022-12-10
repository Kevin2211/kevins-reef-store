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
    const logoStyle ={
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

          <div className="col-sm-12 col-md-6 col-lg-3  mt-3">
            
            <h6 className="text-uppercase mb-4 font-weight-bold">
            <img src="/images/kevinsreeflogo.png" className='logo' alt="" />
              Kevin's Reef Store
            </h6>
            <p>
              
            </p>
          </div>


          <hr className="w-100 clearfix d-md-none" />


          <div className="col-6 col-sm-6 col-md-4 col-lg-2 mt-3">
            <h6 className="text-uppercase mb-3 font-weight-bold">Help</h6>
            <p>
              <Link className="text-dark">DOA policy</Link>
            </p>
            <p>
              <Link className="text-dark">Shipping</ Link>
            </p>

          </div>


          <div className="col-6 col-sm-6 col-md-4 col-lg-2 mt-3">
            <h6 className="text-uppercase mb-2 font-weight-bold">Featured on</h6>
            <img className='mb-2' src="https://reefbuilders.com/wp-content/blogs.dir/1/files/2016/07/RB_Logo-2.png" style={logoStyle} alt="paypal" />
            <img src="https://www.reef2reef.com/attachments/clown-colors-full-1-png.809313/" style={logoStyle} alt="reef2reef" />

          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className="col-6 col-sm-6 col-md-2 col-lg-2 mt-3">
            <h6 className="text-uppercase mb-3 font-weight-bold">Secure Payment</h6>
            <img src="/images/paypal.png" style={logoStyle} alt="paypal" />

          </div>



          <div className=" col-6 col-sm-6 col-md-4 col-lg-2 mt-3">
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
