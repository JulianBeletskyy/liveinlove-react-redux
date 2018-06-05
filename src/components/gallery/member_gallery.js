import React, { Component } from 'react'
import Slider from 'react-slick'

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

class MemberGallery extends Component {
    printItems = (item, i) =>  <div 
                                    key={i}
                                    className="pointer"
                                    onClick={this.props.onClick(i)}
                                    style={{
                                            backgroundImage: `url(${item.src})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            height: 100
                                        }}>
                                </div>
    render() {
    	console.log(this.props)
        const settings = {
            slidesToShow: 3,
            dots: false,
            infinite: true,
            autoplay: false,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            ...this.props.settings
        };
        return (
        	<div className="member-gallery">
	            <Slider {...settings}>
	                { this.props.list.map((item, i) => this.printItems(item, i))}
	            </Slider>
			</div>
        );
    }
}

export default MemberGallery