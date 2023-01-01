import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function Testimonial() {





  return (
        <div>

            <section className="testimonials">
                <div className="container">

                <div className="row">
                    <div className="col-sm-12">
                    <OwlCarousel id="customers-testimonials" className="owl-carousel"
                    loop
                    center
                    items={2}
                    margin={1}
   
                    autoplay
                    dots
                    autoplayTimeout={8500}
                    smartSpeed={450}
                    responsive={{
                      0: {
                        items: 1
                      },
                      768: {
                        items: 2
                      },
                      1170: {
                        items: 3
                      }
                    }}>
                        <div className="item">
                        <div className="shadow-effect">
                            <img className="rounded" src="/images/toadstoolReview.jpg" alt="" />
                            <p>"Loving this Toadstool I got from Kevin's Reef"</p>
                            <p><i> - @reef_woods from Instagram</i></p>
                        </div>
                        <a href="https://www.instagram.com/p/Cle5Pzpr8Px/?igshid=NDk5N2NlZjQ=" target="_blank"><div className="testimonial-name">View</div></a>
                        </div>

                        <div className="item">
                        <div className="shadow-effect">
                            <img className="rounded" src="/images/goniReview.jpg" alt="" />
                            <p>"Over my 20 or so years in the hobby I have purchased corals from a wide variety of vendors and hobbyists alike. The entire transaction and the frags I received today are as good as anyone in the business/hobby..."</p>
                            <p><i> - DIYreefer from Reef2Reef</i></p>
                        </div>
                        <a href="https://www.reef2reef.com/threads/feedback-for-coraladdict645.851587/" target="_blank"><div className="testimonial-name">View</div></a>
                        </div>

            
                        <div className="item">
                        <div className="shadow-effect">
                            <img className="rounded" src="/images/mushroomReview.jpg" alt="" />
                            <p>"Awesome seller, sent out same day, mushroom looks amazing, will buy from again"</p>
                            <p><i> - guy35199 from Reef2Reef</i></p>
                        </div>
                        <a href="https://www.reef2reef.com/threads/coraladdict645-awesome-seller.570454/#post-7645327" target="_blank"><div className="testimonial-name">View</div></a>
                        </div>

 
                        <div className="item">
                        <div className="shadow-effect">
                            <img className="rounded" src="/images/atomicReview.jpg" alt="" />
                            <p>"New Atomic Balls goni from Kevin's Reef is 🔥🔥🔥🔥🔥🔥🔥"</p>
                            <p><i> - @haitian_reefer from Instagram</i></p>
                        </div>
                        <a href="https://www.instagram.com/tv/CXRH3s6sWqg/" target="_blank"><div className="testimonial-name">View</div></a>
                        </div>

                        <div className="item">
                        <div className="shadow-effect">
                            <img className="rounded" src="/images/torchReview.jpg" alt="" />
                            <p>"Professional packaging, items arrived as expected. Great seller and would buy again from him"</p>
                            <p><i> - Perfectly_Imperfekt1 from Reef2Reef</i></p>
                        </div>
                        <a href="https://www.reef2reef.com/classifieds/users/coraladdict645.100195/feedback" target="_blank"><div className="testimonial-name">View</div></a>
                        </div>

                        <div className="item">
                        <div className="shadow-effect">
                            <img className="rounded" src="/images/acropackReview.jpg" alt="" />
                            <p>"Great seller! Everything was amazingly packed and healthy... corals were even open in the bag. Quick shipping and smooth overall experience. Would definitely buy again, one of the best in our hobby..."</p>
                            <p><i> - Daniel from Reef2Reef</i></p>
                        </div>
                        <a href="https://www.reef2reef.com/classifieds/users/coraladdict645.100195/feedback" target="_blank"><div className="testimonial-name">View</div></a>
                        </div>

                        <div className="item">
                        <div className="shadow-effect">
                            <img className="rounded" src="/images/gonipackReview.jpg" alt="" />
                            <p>"Kevin's gonis are beautiful, healthy and well healed. Absolutely incredible communication, packing and shipping"</p>
                            <p><i> - Aquadelic from Reef2Reef</i></p>
                        </div>
                        <a href="https://www.reef2reef.com/classifieds/users/coraladdict645.100195/feedback" target="_blank"><div className="testimonial-name">View</div></a>
                        </div>

            
                    </OwlCarousel>
                    </div>
                </div>
                </div>
            </section>

        </div>
  )
}
