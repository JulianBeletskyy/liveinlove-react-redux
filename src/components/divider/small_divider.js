import React, { Component } from 'react'
import style from './small.css'

class SmallDivider extends Component {
    render() {

        return (
            <div className={style.wrap}>
	            {
	            	this.props.text
	            	? <span className={style.text}>{this.props.text}</span>
	            	: ''
	            }
                <div className={style.divider + ' divider'}></div>
            </div>
        );
    }
}

export default SmallDivider