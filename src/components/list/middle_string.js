import React, { Component } from 'react'
import style from './middle_string.css'

class MiddleString extends Component {
    render() {
        const link = this.props.link ? style.link : '' 
        return (
            <div className={style.wrap}>
                    <span className={style.key}>{this.props.keyName}</span>
                <span>
                    <span className={style.text + ' ' + link} onClick={this.props.onClick}>{this.props.text}</span>
                </span>
            </div>
        );
    }
}

export default MiddleString