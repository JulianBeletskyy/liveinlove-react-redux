import React, { Component } from 'react'
import style from './style.css'

class Zodiac extends Component {

	render() {
		return (
			<span className={style.wrap}>
				<img className={style.img} src={'/assets/img/zodiac/' + this.props.name + '.svg'} alt="" />
				<strong>{this.props.name}</strong>
			</span>
		);
	}
}

export default Zodiac