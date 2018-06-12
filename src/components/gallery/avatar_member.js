import React, { Component } from 'react'
import style from './avatar.css'

class AvatarMember extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <img
                    onClick={this.props.onClick}
                    src={this.props.src}
                    className={"img-responsive pointer " + this.props.className}
                    alt="" />
            </div>
        );
    }
}

export default AvatarMember