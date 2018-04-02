import React, { Component } from 'react'
import style from './style.css'

class CategoryLink extends Component {
    render() {
    	const activeClass = (this.props.active === this.props.id) || (! this.props.id && this.props.active == 0) ? style.active : ''
        return (
            <div className={style.catWrap}>
                <a href="javascript:void(0);" id={this.props.id} className={style.link + ' ' + activeClass} onClick={this.props.onClick}>
                    <span id={this.props.id} className={style.text}>{this.props.text}</span>
                </a>
            </div>
        );
    }
}

export default CategoryLink