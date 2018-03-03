import React, { Component } from 'react'
import style from './carousel.css'

class NextArrow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
    	const { onClick } = this.props

        return (
            <div className={style.wrapArrow + ' ' + style.nextArrow} onClick={onClick}>
                <i className="fas fa-chevron-right fa-3x"></i>
            </div>
        );
    }
}

export default NextArrow