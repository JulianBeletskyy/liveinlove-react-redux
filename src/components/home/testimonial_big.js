import React, { Component } from 'react'
import style from './style.css'
import { BtnMain } from 'components/form/buttons'

class TestimonialBig extends Component {
    render() {
        return (
            <div className={style.testimonialBlock}>
                <div className="row">
                    <div className="col-xs-4 text-center">
                        <img src="assets/img/testimonials-small.jpg" className={style.bigTestimonialsImg} alt="" />
                        <div className={style.testimonialStar}>
                            { Array.apply(null, Array(this.props.rating)).map((item, i) => <i key={i} className="fas fa-star"></i>) }
                        </div>
                    </div>
                    <div className="col-xs-8">
                        <div className={style.testimonialText}>{this.props.text}</div>
                        <div className="row">
                            <div className="col-xs-6">
                                <div className={style.testimonialName}>{this.props.name}</div>
                                <div className={style.testimonialCity}>{this.props.city}</div>
                            </div>
                            <div className="col-xs-6 text-center">
                                <div className={style.testimonialName}>
                                    <BtnMain
                                        type="button"
                                        bsStyle="success"
                                        text="Review"
                                        onClick={this.props.onClick} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestimonialBig