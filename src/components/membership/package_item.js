import React, { Component } from 'react'
import style from './plans.css'

class PackageItem extends Component {
	render() {
		const price = (this.props.item.price - (this.props.item.price / 100 * this.props.discount.discount)).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
        const activeClass = this.props.active.id === this.props.item.id ? style.active : ''
        const rounded = (this.props.item.price / this.props.item.credits).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
        return (
            <div id={this.props.item.id} className={style.wrapPackage + ' ' + activeClass} onClick={this.props.onClick}>
                <strong className="font-bebas">{this.props.item.credits} dibs / ${rounded} per dib - ${this.props.item.price} 
                	{
                		this.props.discount.discount
                		? 	<span> (-{this.props.discount.discount}%)</span>
                		: ''
                	}
                </strong>
            </div>
        );
    }
}

export default PackageItem