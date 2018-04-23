import React, { Component } from 'react'
import style from './carousel.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
        <i className="fas fa-chevron-right" style={{ ...style, 
                                                    position: "absolute", 
                                                    transform: "translateY(-50%)", 
                                                    top: "50%",
                                                    fontSize: "14px",
                                                    color: "initial" }}></i>
    </div>
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
        <i className="fas fa-chevron-left" style={{ ...style, 
                                                    position: "absolute", 
                                                    transform: "translateY(-50%)", 
                                                    top: "50%",
                                                    fontSize: "14px",
                                                    color: "initial",
                                                    right: '0' }}></i>
    </div>
  );
}

class MemberCarousel extends Component {
	printItems = (item, i) => {
		return 	<div key={i} className={style.wrap} onClick={this.props.onClick}>
					<img src={item.avatar} className="img-responsive" alt="" />
					<div className={style.name}>{item.first_name}, {item.age}</div>
				</div>
	}

	render() {
		let settings = {
            slidesToShow: 6,
            dots: false,
            dotsClass: 'slick-dots slick-thumb',
            infinite: true,
            arrows: true,
            autoplay: false,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                {
                    breakpoint: 1120, 
                    settings: {
                        slidesToShow: 4,
                        arrows: false
                    }
                }, {
                    breakpoint: 1650,
                    settings: {slidesToShow: 6}
                }
            ]
        };
		return (
			<Slider {...settings}>
                { this.props.items.map((item, i) => this.printItems(item, i))}
            </Slider>
            )
	}
}

export default MemberCarousel