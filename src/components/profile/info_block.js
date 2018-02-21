import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './info_block.css'

class InfoBlock extends Component {
	printOptions(value, i) {
		return (<div key={i} className={style.value}>{value}</div>)
	}

	render() {
		return (
			<div className={style.wrapper}>
				<div className={style.title}><span>{this.props.title}</span></div>
				{
					this.props.value.map((value, i) => this.printOptions(value, i))
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state
}

export default connect(
	mapStateToProps
)(InfoBlock);