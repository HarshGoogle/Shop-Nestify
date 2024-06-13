import React, { useEffect } from 'react';
import gif0 from './now.gif';
import gif1 from './Sport’s Equipments.gif';
import gif2 from './Untitled design.gif';
import gif3 from './only on SHOP NESTIFY.gif';
import gif4 from './GIF4.gif';
import './Carousel.css';

export default function Carousel({ loggedIn }) {
    useEffect(() => {
        const carouselInterval = setInterval(() => {
            const nextButton = document.querySelector('.carousel-control-next');
            if (nextButton) nextButton.click(); // Simulate a click on the next button to slide to the next item
        }, 4000); // Change slides every 4 seconds (4000 milliseconds)
        return () => clearInterval(carouselInterval); // Clean up the interval on component unmount
    }, []);

    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
            <div className="carousel-indicators">
                {loggedIn ? (
                    <>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    </>
                ) : (
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                )}
            </div>
            <div className="carousel-inner">
                {loggedIn ? (
                    <>
                        <div className="carousel-item active slides" data-bs-interval="10000">
                            <img src={gif1} className="slideImg" alt="Sport’s Equipments" />
                        </div>
                        <div className="carousel-item slides" data-bs-interval="2000">
                            <img src={gif2} className="slideImg" alt="Untitled design" />
                        </div>
                        <div className="carousel-item slides">
                            <img src={gif3} className="slideImg" alt="only on SHOP NESTIFY" />
                        </div>
                        <div className="carousel-item slides">
                            <img src={gif4} className="slideImg" alt="GIF4" />
                        </div>
                    </>
                ) : (
                    <div className="carousel-item active slides" data-bs-interval="10000">
                        <img src={gif0} className="slideImg" alt="now" />
                    </div>
                )}
            </div>
            <button className="carousel-control-prev d-hidden" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev" style={{ visibility: 'hidden' }}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next" style={{ visibility: 'hidden' }}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>
    );
}
