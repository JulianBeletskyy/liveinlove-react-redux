import React, { Component } from 'react'
import style from './carousel.css'

class PrevArrow extends Component {
    
    render() {
        return (
            <div className={style.wrapArrow + ' ' + style.prevArrow} onClick={this.props.onClick}>
                <i className="fas fa-chevron-left fa-3x"></i>
            </div>
        );
    }
}

export default PrevArrow