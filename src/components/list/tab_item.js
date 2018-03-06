import React, { Component } from 'react'
import style from './tab_item.css'

class TabItem extends Component {
    render() {
        const activeClass = this.props.activeClass ? style.active : ''
        return (
            <div className={style.wrap + ' ' + activeClass}>
               <a onClick={this.props.onClick}>{this.props.title}</a>
            </div>
        );
    }
}

export default TabItem