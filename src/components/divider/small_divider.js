import React, { Component } from 'react'
import style from './small.css'

class SmallDivider extends Component {
    render() {
        let orientationStyle = ''
        const orientation = this.props.orientation
        orientationStyle = orientation === 'right' ? style.right : style.left

        return (
            <div className={style.wrap}>
                <span className={style.text}>{this.props.text}</span>
                <div className={style.divider + ' divider'}></div>
            </div>
        );
    }
}

export default SmallDivider