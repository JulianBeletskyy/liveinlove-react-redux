import React, { Component } from 'react'
import style from './carousel.css'

class PrevArrow extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { onClick } = this.props
        return (
            <div className={style.wrapArrow + ' ' + style.prevArrow} onClick={onClick}>
                <i className="fas fa-chevron-left fa-3x"></i>
            </div>
        );
    }
}

export default PrevArrow