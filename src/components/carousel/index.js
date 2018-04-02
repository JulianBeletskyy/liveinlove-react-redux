import React, { Component } from 'react'
import style from './carousel.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrevArrow from './prev_arrow.js'
import NextArrow from './next_arrow.js'

class Carousel extends Component {
    printItems(item, i) {
        return <div className={style.planItem} key={i}>{item}</div>
    }
    
    render() {
        let settings = {
            slidesToShow: this.props.slidesToShow || 3,
            dots: false,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            dotsClass: 'slick-dots slick-thumb',

            infinite: this.props.infinite || false,
            arrows: this.props.arrows,
            autoplay: this.props.autoplay || false,

            responsive: [
                {
                    breakpoint: 1120, 
                    settings: {
                        slidesToShow: 1, 
                        dots: true,
                        arrows: false
                    }
                }, {
                    breakpoint: 1650,
                    settings: {slidesToShow: 2}
                }
            ]
        };

        return (
            <div className="clearfix">
                <Slider {...settings}>
                    { this.props.items.map((item, i) => this.printItems(item, i))}
                </Slider>
            </div>
        );
    }
}

export default Carousel