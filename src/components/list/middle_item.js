import React, { Component } from 'react'
import style from './middle_item.css'
import { Link } from 'react-router-dom'

class MiddleItem extends Component {
    render() {
        let classRole = this.props.role === 'client' ? style.client : style.girl

        return (
            <div className={style.infoItem + ' ' + classRole} onClick={this.props.onClick}>
                <i className={this.props.icon}></i>
                <strong>
                {
                    this.props.link
                    ? <Link to={this.props.link}>{this.props.text}</Link>
                    : <span>{this.props.text}</span>
                }
                </strong>
            </div>
        );
    }
}

export default MiddleItem