import React, { Component } from 'react'
import style from './carousel.css'

class NextArrow extends Component {
    
    render() {
        return (
            <div className={style.wrapArrow + ' ' + style.nextArrow} onClick={this.props.onClick}>
                <i className="fas fa-chevron-right fa-3x"></i>
            </div>
        );
    }
}

export default NextArrow