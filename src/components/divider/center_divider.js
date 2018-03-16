import React, { Component } from 'react'
import style from './small.css'

class CenterDivider extends Component {
    render() {

        return (
            <div className={style.wrap}>
                <span className={style.text}>{this.props.text}</span>
                <div className={style.divider + ' divider'}></div>
            </div>
        );
    }
}

export default CenterDivider