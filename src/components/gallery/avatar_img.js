import React, { Component } from 'react'
import style from './avatar.css'

class AvatarImg extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <div 
                    className={style.hover}
                    onClick={this.props.onClick}>
                    <span className={style.span}>{this.props.textHover}</span>
                </div>
                <img
                    src={this.props.src}
                    className={style.img}
                    alt="" />
            </div>
        );
    }
}

export default AvatarImg