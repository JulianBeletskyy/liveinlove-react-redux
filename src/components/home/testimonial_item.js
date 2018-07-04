import React, { Component } from 'react'
import style from './style.css'

class TestimonialItem extends Component {
    getText = text => text.length > 330 ? text.slice(0, 330) + '...' : text

    render() {
        const imgStyle = {
            backgroundImage: `url(${this.props.img})`,
            height: 120,
            backgroundPosition: '50%',
            width: 120,
            borderRadius: '50%',
            margin: '0 auto',
            backgroundSize: 'cover'
        }

        return (
                <div className={style.testimonialBlock + ' text-center'} style={{height: 340}} onClick={this.props.onClick}>
                    <div style={imgStyle}>
                    </div>
                    <div className={style.testimonialText}>{this.getText(this.props.text)}</div>
                    <div className={style.testimonialName}>{this.props.name}</div>
                </div>
        );
    }
}

export default TestimonialItem