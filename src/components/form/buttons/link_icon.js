import React, { Component } from 'react'
import style from './button.css'

class LinkIcon extends Component {
    render() {
        return (
            <div className="link-icon">
                <i className={this.props.icon} style={{color: this.props.color}}></i>
                <a
                    href="javascript:;"
                    onClick={this.props.onClick} >
                    <span>{this.props.text}</span>
                    
                </a>
            </div>
        );
    }
}

export default LinkIcon