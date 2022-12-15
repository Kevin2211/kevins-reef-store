import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap';

export default function ImageCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} >
        <Carousel.Item interval={6000}>
          <video
            className="d-block w-100 "
            src="https://res.cloudinary.com/dckddk4fm/video/upload/v1671122506/Kevins-reef-store/carousel1_veklev.mp4"
            alt="First slide"
            loop
            muted
            autoPlay
            playsInline
          />
          <Carousel.Caption>
            <h3>Welcome to the Kevin's Reef Store</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <img
            className="d-block w-100 "
            src="/images/carousel2.jpg"
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src="/images/carousel2.jpg"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
}
