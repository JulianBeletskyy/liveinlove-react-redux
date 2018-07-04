import React, { Component } from 'react'
import style from './style.css'
import { BtnMain } from 'components/form/buttons'

class TestimonialBig extends Component {
    render() {
        return (
            <div className={style.testimonialBlock}>
                <div className="row">
                    <div className="col-sm-4 text-center">
                        <img src={this.props.img} className={style.bigTestimonialsImg} alt="" />
                    </div>
                    <div className="col-sm-8">
                        <div className={style.testimonialText}>{this.props.text}</div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className={style.testimonialName}>{this.props.name}</div>
                            </div>
                            <div className="col-sm-6 text-center">
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