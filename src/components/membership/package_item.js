import React, { Component } from 'react'
import style from './plans.css'

class PackageItem extends Component {
	render() {
        const activeClass = this.props.active.id === this.props.item.id ? style.active : ''
        return (
            <div id={this.props.item.id} className={style.wrapPackage + ' ' + activeClass} onClick={this.props.onClick}>
                <strong className="font-bebas">{this.props.item.credits} dibs / ${(this.props.item.price / this.props.item.credits)} per dib - ${this.props.item.price}</strong>
            </div>
        );
    }
}

export default PackageItem